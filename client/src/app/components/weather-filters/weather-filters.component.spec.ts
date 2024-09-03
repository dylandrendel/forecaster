import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherFiltersComponent } from './weather-filters.component';

describe('WeatherFiltersComponent', () => {
  let component: WeatherFiltersComponent;
  let fixture: ComponentFixture<WeatherFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
