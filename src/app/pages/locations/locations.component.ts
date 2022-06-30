import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Location } from 'src/app/models/locations.model';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  locations$: Observable<Location[]> | undefined;
  loading$: Observable<boolean> | undefined;

  queryForm: FormGroup = this.fb.group({});

  constructor(
    private locationsService: LocationsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.locations$ = this.locationsService
      .getLocations()
      .pipe(map((res) => res.results));
    this.loading$ = this.locationsService.getLoadingState();
    this.buildForm();
  }

  buildForm(): void {
    this.queryForm = this.fb.group({
      nameInput: [''],
      dimensionInput: [''],
    });
  }

  searchByQuery(): void {
    this.locations$ = this.locationsService
      .getLocations(
        this.queryForm.value.nameInput,
        this.queryForm.value.dimensionInput
      )
      .pipe(map((res) => res.results));
  }
}
