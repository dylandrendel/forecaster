import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  WeatherForecastItem,
  WeatherSummary,
} from '../components/weather-forecast/weather-forecast-datasource';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

export interface WeatherForecastFilters {
  temp: number;
  summary: WeatherSummary;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
  data: Signal<WeatherForecastItem[] | undefined>;
  data$: Observable<WeatherForecastItem[] | undefined>;
  tempFilter = signal(0);
  dateFilter = signal(new Date());
  summaryFilter = signal(Object.values(WeatherSummary));
  tempFilterF = computed(() => (this.tempFilter() * 9) / 5 + 32);
  filteredData = computed(() =>
    this.data()?.filter(
      (item) =>
        item.temperatureC > this.tempFilter() &&
        new Date(item.date).getTime() >= this.dateFilter().getTime() &&
        this.summaryFilter().includes(item.summary)
    )
  );

  constructor(private http: HttpClient) {
    const filters = { temp: -10, summary: 'Balmy' };
    this.data = toSignal<WeatherForecastItem[]>(this.getWeatherForecast());
    this.data$ = toObservable(this.filteredData);
  }

  getWeatherForecast(
    filters?: WeatherForecastFilters
  ): Observable<WeatherForecastItem[]> {
    let endpoint = 'api/weatherforecast';
    endpoint += filters
      ? `/filtered?temp=${filters.temp}&summary=${filters.summary}`
      : '';
    return this.http.get<WeatherForecastItem[]>(endpoint);
  }
}
