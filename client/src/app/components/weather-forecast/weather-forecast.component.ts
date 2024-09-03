import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {
  WeatherForecastDataSource,
  WeatherForecastItem,
} from './weather-forecast-datasource';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import { DatePipe } from '@angular/common';
import { WeatherFiltersComponent } from "../weather-filters/weather-filters.component";

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, WeatherFiltersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherForecastComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<WeatherForecastItem>;
  dataSource: WeatherForecastDataSource;

  constructor(public wf: WeatherForecastService) {
    this.dataSource = new WeatherForecastDataSource(wf);
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'temperatureC', 'temperatureF', 'summary'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
