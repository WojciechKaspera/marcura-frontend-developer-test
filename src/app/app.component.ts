import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { MapComponent } from './components/map/map.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CruisesActions } from './store/cruises/cruises.actions';
import { VelocityChartComponent } from './components/velocity-chart/velocity-chart.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MapComponent, AsyncPipe, SidebarComponent, VelocityChartComponent, HeaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  store: Store = inject(Store)

  ngOnInit() {
    this.store.dispatch(CruisesActions.fetchCruises());
  }
}
