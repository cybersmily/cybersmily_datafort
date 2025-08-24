import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CmbtTrckOppChartService } from './../services/cmbt-trck-opp-chart.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CmbtTrkCyberComponent } from './cmbt-trk-cyber.component';

describe('CmbtTrkCyberComponent', () => {
  let component: CmbtTrkCyberComponent;
  let fixture: ComponentFixture<CmbtTrkCyberComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        CmbtTrkCyberComponent
    ],
    imports: [CommonUiModule,
        BrowserAnimationsModule,
        PipesModule],
    providers: [
        CmbtTrckOppChartService,
        DataService,
        DiceService,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrkCyberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
