import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';

import { Map, map, tileLayer } from 'leaflet';

import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  mapService: MapService = inject(MapService);

  @ViewChild('mapContainer') private mapContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.initiateMap();
  }

  initiateMap() {
    const initialPosition = { lng: 50, lat: 20 };
    const initialZoom = 3;
    const leafletMap: Map = map(this.mapContainer.nativeElement, { zoomControl: false }).setView([ initialPosition.lng, initialPosition.lat ], initialZoom);
    this.mapService.map = leafletMap;
    const mapsProviderUrl = 'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=054f0f7e29514c98b79b9ecb8ea44729';
    tileLayer(mapsProviderUrl, {
      maxZoom: 10,
      id: 'osm-bright'
    }).addTo(leafletMap);
  }
}
