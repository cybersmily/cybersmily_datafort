import { DiceService } from './../../../../services/dice/dice.service';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { ClubChartDataService } from './../../services/club-chart-data/club-chart-data.service';
import { CommonUiModule } from './../../../common-ui/common-ui.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDisplayComponent } from './club-display.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClubDisplayComponent', () => {
  let component: ClubDisplayComponent;
  let fixture: ComponentFixture<ClubDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ClubDisplayComponent],
    imports: [CommonUiModule],
    providers: [ClubChartDataService, DataService, DiceService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
