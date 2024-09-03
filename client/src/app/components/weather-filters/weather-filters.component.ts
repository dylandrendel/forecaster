import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { WeatherSummary } from '../weather-forecast/weather-forecast-datasource';

@Component({
  selector: 'app-weather-filters',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './weather-filters.component.html',
  styleUrl: './weather-filters.component.scss',
})
export class WeatherFiltersComponent {
  summaries = Object.values(WeatherSummary);
  constructor(public wfService: WeatherForecastService) {}
}
