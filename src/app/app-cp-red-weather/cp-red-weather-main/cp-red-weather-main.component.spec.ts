import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedWeatherMainComponent } from './cp-red-weather-main.component';

describe('CpRedWeatherMainComponent', () => {
  let component: CpRedWeatherMainComponent;
  let fixture: ComponentFixture<CpRedWeatherMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedWeatherMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedWeatherMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
