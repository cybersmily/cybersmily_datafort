import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SeoService } from './../../shared/services/seo/seo.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { FixerCalcBigLeagueContactNewComponent } from './../fixer-calc-big-league-contact-new/fixer-calc-big-league-contact-new.component';
import { FixerCalcBigLeagueContactComponent } from './../fixer-calc-big-league-contact/fixer-calc-big-league-contact.component';
import { FixerCalcHotStuffAreaComponent } from './../fixer-calc-hot-stuff-area/fixer-calc-hot-stuff-area.component';
import { FixerCalcHotStuffComponent } from './../fixer-calc-hot-stuff/fixer-calc-hot-stuff.component';
import { FixerCalcBigLeagueComponent } from './../fixer-calc-big-league/fixer-calc-big-league.component';
import { FixerBigLeagueService } from './../../shared/services/fixer/fixer-big-league.service';
import { FixerHotStuffService } from './../../shared/services/fixer/fixer-hot-stuff.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixerCalcMainComponent } from './fixer-calc-main.component';

describe('FixerCalcMainComponent', () => {
  let component: FixerCalcMainComponent;
  let fixture: ComponentFixture<FixerCalcMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      declarations: [
        FixerCalcMainComponent,
        FixerCalcBigLeagueComponent,
        FixerCalcHotStuffComponent,
        FixerCalcHotStuffAreaComponent,
        FixerCalcBigLeagueContactComponent,
        FixerCalcBigLeagueContactNewComponent
      ],
      providers: [
        FixerHotStuffService,
        FixerBigLeagueService,
        SeoService,
        DataService,
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixerCalcMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
