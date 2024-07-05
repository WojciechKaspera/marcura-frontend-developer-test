import { createFeature, createReducer, on } from '@ngrx/store';

import { Cruise } from '../../models/cruise';
import { CruisesActions } from './cruises.actions';
import { getFilteredCruises } from './cruises.helpers';

enum FetchStatus {
  IDLE,
  IN_PROGRESS,
  SUCCESS,
  FAILURE
}

export interface CruisesState {
  selectedCruise: Cruise | null;
  highlightedCruise: Cruise | null;
  cruises: Cruise[];
  filteredCruises: Cruise[];
  fetchStatus: FetchStatus;
  portNameFilter: string;
  minDurationFilter: number | null;
  maxDurationFilter: number | null;
}

const initialState: CruisesState = {
  selectedCruise: null,
  highlightedCruise: null,
  cruises: [],
  filteredCruises: [],
  fetchStatus: FetchStatus.IDLE,
  portNameFilter: '',
  minDurationFilter: null,
  maxDurationFilter: null
};

export const CruisesFeature = createFeature({
  name: 'cruises',
  reducer: createReducer(
    initialState,
    on(CruisesActions.fetchCruises, (state: CruisesState) => ({
      ...state,
      fetchStatus: FetchStatus.IN_PROGRESS
    })),
    on(CruisesActions.fetchCruisesSuccess, (state: CruisesState, { cruises }) => ({
      ...state,
      cruises,
      filteredCruises: cruises,
      fetchStatus: FetchStatus.SUCCESS
    })),
    on(CruisesActions.fetchCruisesFailure, (state: CruisesState) => ({
      ...state,
      fetchStatus: FetchStatus.FAILURE
    })),
    on(CruisesActions.setSelectedCruise, (state: CruisesState, { selectedCruise }) => ({
      ...state,
      selectedCruise
    })),
    on(CruisesActions.setHighlightedCruise, (state: CruisesState, { highlightedCruise }) => ({
      ...state,
      highlightedCruise
    })),
    on(CruisesActions.setFilters, (state: CruisesState, { portNameFilter, minDurationFilter, maxDurationFilter }) => ({
      ...state,
      portNameFilter,
      minDurationFilter,
      maxDurationFilter,
      filteredCruises: getFilteredCruises(state.cruises, { portNameFilter, minDurationFilter, maxDurationFilter })
    })),
    on(CruisesActions.resetFilters, () => ({
      ...initialState
    }))
  )
});
