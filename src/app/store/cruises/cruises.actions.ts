import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Cruise } from '../../models/cruise';

export const CruisesActions = createActionGroup({
  source: 'cruises',
  events: {
    'Fetch cruises': emptyProps(),
    'Fetch cruises success': props<{ cruises: Cruise[] }>(),
    'Fetch cruises failure': emptyProps(),
    'Set selected cruise': props<{ selectedCruise: Cruise }>(),
    'Set highlighted cruise': props<{ highlightedCruise: Cruise | null }>(),

    'Set filters': props<{ portNameFilter: string; minDurationFilter: number | null; maxDurationFilter: number | null; }>(),
    'Reset filters': emptyProps()
  }
});
