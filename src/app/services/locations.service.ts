import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { Location, Response } from '../models/locations.model';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  baseUrl = 'https://rickandmortyapi.com/api/';
  loading = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  getLocations(name?: string, dimension?: string): Observable<Response> {
    this.loading.next(true);

    if (name && dimension) {
      return this.http
        .get<Response>(
          `${this.baseUrl}location/?name=${name}&dimension=${dimension}`
        )
        .pipe(finalize(() => this.loading.next(false)));
    } else if (dimension) {
      return this.http
        .get<Response>(`${this.baseUrl}location/?dimension=${dimension}`)
        .pipe(finalize(() => this.loading.next(false)));
    } else if (name) {
      return this.http
        .get<Response>(`${this.baseUrl}location/?name=${name}`)
        .pipe(finalize(() => this.loading.next(false)));
    } else {
      return this.http
        .get<Response>(`${this.baseUrl}location`)
        .pipe(finalize(() => this.loading.next(false)));
    }
  }

  getLoadingState(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
