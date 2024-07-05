import { Injectable } from '@angular/core';

import { Circle, circle, Map, Marker, marker } from 'leaflet';

import { CruisePoint } from '../models/cruise-point';
import { EndPortIcon, StartPortIcon } from '../components/map/marker-icons';
import { Cruise } from '../models/cruise';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map!: Map;
  markers: (Circle | Marker)[] = [];
  temporaryMarkers: (Circle | Marker)[] = [];

  displayCruise(cruise: Cruise) {
    const cruisePoints = cruise.points;
    this.clearMap();
    this.addPortMarkers(cruisePoints);
    const boundaries = this.getInitialBoundaries(cruisePoints[0]);
    cruisePoints.forEach((point: CruisePoint) => {
      this.updateBoundaries(boundaries, point);
      this.addCruiseMarker(point);
    });
    this.map.fitBounds([ [ boundaries.w - 3, boundaries.n + 1 ], [ boundaries.e + 1, boundaries.s - 5 ] ]);
  }

  highlightCruise(cruise: Cruise) {
    const cruisePoints = cruise.points;
    this.removeTemporaryMarkers();
    this.addPortMarkers(cruisePoints, true);
  }

  addCruiseMarker(point: CruisePoint) {
    const markerColor = this.getMarkerColor(point[3]);
    const marker = circle([ point[1], point[0] ], {
      color: markerColor,
      fillColor: markerColor,
      radius: 10
    });
    this.markers.push(marker);
    marker.addTo(this.map);
  }

  getMarkerColor(velocity: number) {
    switch (true) {
      case velocity < 5:
        return 'blue';
      case velocity < 15:
        return 'yellow';
      case velocity < 20:
        return 'orange';
      default:
        return 'red';
    }
  }

  addPortMarkers(cruisePoints: CruisePoint[], isMarkerTemporary = false) {
    const startPoint = cruisePoints[0];
    const endPoint = cruisePoints[cruisePoints.length - 1];
    const startPortMarker = marker([ startPoint[1], startPoint[0] ], {
      icon: StartPortIcon
    });
    const endPortMarker = marker([ endPoint[1], endPoint[0] ], {
      icon: EndPortIcon
    });
    (isMarkerTemporary ? this.temporaryMarkers : this.markers).push(...[ startPortMarker, endPortMarker ]);
    endPortMarker.addTo(this.map);
    startPortMarker.addTo(this.map);
  }

  clearMap() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
    this.removeTemporaryMarkers();
  }

  removeTemporaryMarkers() {
    this.temporaryMarkers.forEach(marker => marker.remove());
    this.temporaryMarkers = [];
  }

  getInitialBoundaries(startingCruisePoint: CruisePoint) {
    return {
      n: startingCruisePoint[0],
      e: startingCruisePoint[1],
      s: startingCruisePoint[0],
      w: startingCruisePoint[1]
    };
  }

  updateBoundaries(boundaries: { n: number, e: number; s: number; w: number; }, point: CruisePoint) {
    if (point[0] > boundaries.n) {
      boundaries.n = point[0];
    }
    if (point[0] < boundaries.s) {
      boundaries.s = point[0];
    }
    if (point[1] > boundaries.e) {
      boundaries.e = point[1];
    }
    if (point[1] < boundaries.w) {
      boundaries.w = point[1];
    }
  }
}
