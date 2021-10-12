import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedWeatherMainComponent } from './cp-red-weather-main.component';

describe('CpRedWeatherMainComponent', () => {
  let component: CpRedWeatherMainComponent;
  let fixture: ComponentFixture<CpRedWeatherMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedWeatherMainComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        DiceService
      ]
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
