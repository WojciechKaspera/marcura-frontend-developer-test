import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { CruisesActions } from './cruises.actions';
import { FleetDataService } from '../../services/fleet-data.service';
import { MapService } from '../../services/map.service';

export class CruisesEffects {
  actions$: Actions = inject(Actions);
  fleetDataService: FleetDataService = inject(FleetDataService);
  mapService: MapService = inject(MapService);

  fetchCruises$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CruisesActions.fetchCruises),
      switchMap(
        () => this.fleetDataService.getCruises().pipe(
          map(cruises => CruisesActions.fetchCruisesSuccess({ cruises })),
          catchError(error => {
            console.error('Cruises fetch failure!');
            return of(CruisesActions.fetchCruisesFailure);
          })
        )
      )
    );
  });

  highlightCruise$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CruisesActions.setHighlightedCruise),
        tap(({ highlightedCruise }) => {
          if (highlightedCruise) {
            this.mapService.highlightCruise(highlightedCruise);
          } else {
            this.mapService.removeTemporaryMarkers();
          }
        })
      );
    },
    { dispatch: false });

  displayCruise$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CruisesActions.setSelectedCruise),
        tap(({ selectedCruise }) => this.mapService.displayCruise(selectedCruise)),
      );
    },
    { dispatch: false }
  );
}
