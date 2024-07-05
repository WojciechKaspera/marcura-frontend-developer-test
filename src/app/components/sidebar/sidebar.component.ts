import { Component, inject, Signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { Cruise } from '../../models/cruise';
import { CruisesActions } from '../../store/cruises/cruises.actions';
import { selectFilteredCruises } from '../../store/cruises/cruises.selectors';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ FiltersComponent ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  shouldFiltersByDisplayed = false;
  store: Store = inject(Store);
  cruises: Signal<Cruise[]> = this.store.selectSignal(selectFilteredCruises);

  toggleFiltersVisibility() {
    this.shouldFiltersByDisplayed = !this.shouldFiltersByDisplayed;
  }

  displayCruise(selectedCruise: Cruise) {
    this.store.dispatch(CruisesActions.setSelectedCruise({ selectedCruise }));
  }

  highlightCruise(highlightedCruise: Cruise) {
    this.store.dispatch(CruisesActions.setHighlightedCruise({ highlightedCruise }));
  }

  removePortHighlight() {
    this.store.dispatch(CruisesActions.setHighlightedCruise({ highlightedCruise: null }));
  }

  getCruiseDuration(cruise: Cruise): string {
    const minutesMultiplier = 1000 * 60;
    const hoursMultiplier = minutesMultiplier * 60;
    return `${Math.floor(cruise.legDuration / hoursMultiplier)}h ${Math.round(cruise.legDuration / minutesMultiplier % 60)}min`;
  }
}
