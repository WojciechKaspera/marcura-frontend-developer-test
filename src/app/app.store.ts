import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { CruisesFeature } from './store/cruises/cruises.reducers';
import { CruisesEffects } from './store/cruises/cruises.effects';

export const APP_STORE_PROVIDERS = [
  provideStore(),
  provideState(CruisesFeature),
  provideEffects([ CruisesEffects ]),
];
