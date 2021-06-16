import { FixerCalcBigLeagueContactNewComponent } from './../fixer-calc-big-league-contact-new/fixer-calc-big-league-contact-new.component';
import { FixerCalcBigLeagueContactComponent } from './../fixer-calc-big-league-contact/fixer-calc-big-league-contact.component';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { FixerBigLeagueService } from './../../shared/services/fixer/fixer-big-league.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixerCalcBigLeagueComponent } from './fixer-calc-big-league.component';

describe('FixerCalcBigLeagueComponent', () => {
  let component: FixerCalcBigLeagueComponent;
  let fixture: ComponentFixture<FixerCalcBigLeagueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FixerCalcBigLeagueComponent,
        FixerCalcBigLeagueContactComponent,
        FixerCalcBigLeagueContactNewComponent
      ],
      imports: [
        CommonUiModule
      ],
      providers: [
        FixerBigLeagueService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixerCalcBigLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
