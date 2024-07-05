import { CruisePoint } from './cruise-point';

export interface Cruise {
  cruiseId: number;
  fromPort: string;
  toPort: string;
  legDuration: number;
  points: CruisePoint[];
  approximateLength: number;
}
