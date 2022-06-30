import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../services/users.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  loading$: Observable<boolean> | undefined;
  count$: Observable<number> | undefined;

  queryForm: FormGroup = this.fb.group({});

  pageEvent: PageEvent | undefined;

  constructor(private usersService: UsersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers().pipe(map((res) => res.results));
    this.count$ = this.usersService
      .getUsers()
      .pipe(map((res) => res.info.count));
    this.loading$ = this.usersService.getLoadingState();
    this.buildForm();
  }

  buildForm(): void {
    this.queryForm = this.fb.group({
      nameInput: [''],
      genderInput: [''],
    });
  }

  searchByQuery(): void {
    this.users$ = this.usersService
      .getUsers(
        this.queryForm.value.nameInput,
        this.queryForm.value.genderInput
      )
      .pipe(map((res) => res.results));
    this.count$ = this.usersService
      .getUsers(
        this.queryForm.value.nameInput,
        this.queryForm.value.genderInput
      )
      .pipe(map((res) => res.info.count));
  }
}
