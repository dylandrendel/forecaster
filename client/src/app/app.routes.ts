import { Routes } from '@angular/router';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { MyDayComponent } from './components/my-day/my-day.component';
import { GoalsComponent } from './components/goals/goals.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/weather-forecast',
    pathMatch: 'full',
  },
  {
    path: 'weather-forecast',
    component: WeatherForecastComponent,
  },
  {
    path: 'my-day',
    component: MyDayComponent,
  },
  {
    path: 'goals',
    component: GoalsComponent,
  },
];
