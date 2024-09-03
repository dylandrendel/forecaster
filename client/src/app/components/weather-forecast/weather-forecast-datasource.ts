import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { WeatherForecastService } from '../../services/weather-forecast.service';

// TODO: Replace this with your own data model type
export interface WeatherForecastItem {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: WeatherSummary;
}

export enum WeatherSummary {
  Freezing = 'Freezing',
  Bracing = 'Bracing',
  Chilly = 'Chilly',
  Cool = 'Cool',
  Mild = 'Mild',
  Warm = 'Warm',
  Balmy = 'Balmy',
  Hot = 'Hot',
  Sweltering = 'Sweltering',
  Scorching = 'Scorching',
}

/**
 * Data source for the WeatherForecast view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class WeatherForecastDataSource extends DataSource<WeatherForecastItem> {
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private wf: WeatherForecastService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<WeatherForecastItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        this.wf.data$,
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(
            this.getSortedData([...(this.wf.filteredData() ?? [])])
          );
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: WeatherForecastItem[]): WeatherForecastItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: WeatherForecastItem[]): WeatherForecastItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'temperatureC':
          return compare(+a.temperatureC, +b.temperatureC, isAsc);
        case 'temperatureF':
          return compare(+a.temperatureF, +b.temperatureF, isAsc);
        case 'summary':
          return compare(a.summary, b.summary, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
