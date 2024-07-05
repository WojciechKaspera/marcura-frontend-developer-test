import { CruisesFeature } from './cruises.reducers';

export const {
  selectCruises: selectCruises,
  selectSelectedCruise: selectSelectedCruise,
  selectFilteredCruises: selectFilteredCruises,
  selectPortNameFilter: selectFiltersPortName,
  selectMinDurationFilter: selectFiltersMinDuration,
  selectMaxDurationFilter: selectFiltersMaxDuration
} = CruisesFeature;
