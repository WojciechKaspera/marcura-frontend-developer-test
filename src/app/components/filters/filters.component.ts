import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Filters } from '../../models/filters';
import { CruisesActions } from '../../store/cruises/cruises.actions';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit, OnDestroy {

  store: Store = inject(Store);

  filtersForm = new FormGroup({
    portNameFilter: new FormControl<string>(''),
    minDurationFilter: new FormControl<number | null>(null),
    maxDurationFilter: new FormControl<number | null>(null)
  })
  filtersFormSubscription!: Subscription;

  ngOnInit() {
    this.filtersFormSubscription = this.filtersForm.valueChanges.subscribe(
      (filtersValue) => this.store.dispatch(CruisesActions.setFilters(filtersValue as Filters))
    );
  }

  ngOnDestroy() {
    this.filtersFormSubscription.unsubscribe();
  }

}
