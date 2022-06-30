import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  map,
  Observable,
  take,
  tap,
  finalize,
  catchError,
} from 'rxjs';
import { User, Response } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = 'https://rickandmortyapi.com/api/';
  loading = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  getUsers(name?: string, gender?: string): Observable<Response> {
    this.loading.next(true);

    if (name && gender) {
      return this.http
        .get<Response>(
          `${this.baseUrl}/character/?name=${name}&gender=${gender}`
        )
        .pipe(finalize(() => this.loading.next(false)));
    } else if (gender) {
      return this.http
        .get<Response>(`${this.baseUrl}/character/?gender=${gender}`)
        .pipe(finalize(() => this.loading.next(false)));
    } else if (name) {
      return this.http
        .get<Response>(`${this.baseUrl}/character/?name=${name}`)
        .pipe(finalize(() => this.loading.next(false)));
    } else {
      return this.http
        .get<Response>(`${this.baseUrl}/character`)
        .pipe(finalize(() => this.loading.next(false)));
    }
  }

  getUser(id: number): Observable<User> {
    this.loading.next(true);
    return this.http
      .get<User>(`${this.baseUrl}/character/${id}`)
      .pipe(finalize(() => this.loading.next(false)));
  }

  changePage(page: number): void {
    this.loading.next(true);
    this.http
      .get<Response>(`${page}`)
      .pipe(finalize(() => this.loading.next(false)));
  }

  getLoadingState(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
