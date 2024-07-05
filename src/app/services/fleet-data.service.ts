import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, EMPTY, map, Observable } from 'rxjs';

import { Cruise } from '../models/cruise';
import { CruisePoint } from '../models/cruise-point';

@Injectable({
  providedIn: 'root'
})
export class FleetDataService {

  http = inject(HttpClient);

  getCruises(): Observable<Cruise[]> {
    return this.http.get('assets/web_challenge.csv', { responseType: 'text' }).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
        return EMPTY;
      }),
      map((rawData: string) => {
        // todo test to check if csv is correct
        const dataRows = rawData.split('\n');
        return dataRows.slice(1).filter(dataRow => dataRow).map(
          (dataRow: string) => {
            const splittedRow = JSON.parse(`[${ dataRow }]`);
            const points = JSON.parse(splittedRow[4]);
            let approximateLength = 0;
            points.forEach(
              (cruisePoint: CruisePoint, index: number) => {
                // approximateLength +=
              }
            );
            return {
              cruiseId: parseInt(splittedRow[0], 10),
              fromPort: splittedRow[1],
              toPort: splittedRow[2],
              legDuration: parseInt(splittedRow[3]),
              points,
              approximateLength
            };
          }
        );
      })
    );
  }

}
