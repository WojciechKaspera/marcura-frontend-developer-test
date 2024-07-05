import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';

import { Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import ApexCharts from 'apexcharts'

import { selectSelectedCruise } from '../../store/cruises/cruises.selectors';
import { CruisePoint } from '../../models/cruise-point';

@Component({
  selector: 'app-velocity-chart',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe
  ],
  providers: [ DatePipe ],
  templateUrl: './velocity-chart.component.html',
  styleUrl: './velocity-chart.component.scss'
})
export class VelocityChartComponent implements AfterViewInit {

  store: Store = inject(Store);
  chart: any;
  selectedCruise$: Observable<number[][] | null> = this.getMappedSelectedCruise();
  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const options = {
      chart: {
        type: 'line',
        height: '200px',
        width: '100%',
        toolbar: {
          show: false
        },
        fill: {
          color: ['#ffffff']
        },
        dataLabels: {
          style: {
            colors: ['#ffffff']
          }
        },
        grid: {
          row: {
            colors: ['#ffffff']
          },
          column: {
            colors: ['#ffffff']
          }
        }
      },
      colors: ['#ffffff'],
      dataLabels: {
        style: {
          colors: ['#ffffff']
        }
      },
      series: [{
        data: []
      }],
      xaxis: {
        type: 'numeric',
        labels: {
          style: {
            colors: '#ffffff'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff'
          }
        }
      }
    }
    this.chart = new ApexCharts(this.chartContainer.nativeElement, options);
    this.chart.render();
  }

  getMappedSelectedCruise(): Observable<number[][]> {
    return this.store.select(selectSelectedCruise).pipe(
      filter(cruise => !!cruise),
      map(cruise => {
        const timestampBaseline = cruise?.points[0][2] || 0;
        return cruise!.points.map(
          (point: CruisePoint) => {
            const hoursMultiplier = 1000 * 60 * 60;
            return [(point[2] - timestampBaseline)/hoursMultiplier, point[3]];
          }
        ).filter((point: number[]) => point[0] !== null && point[1] !== null);
      }),
      tap((dataPoints) => this.displayData(dataPoints))
    );
  }

  displayData(dataPoints: number[][]) {
    this.chart.updateSeries([{data: dataPoints}])
  }
}
