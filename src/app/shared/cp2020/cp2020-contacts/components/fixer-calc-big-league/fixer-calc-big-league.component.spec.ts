import { DiceService } from '../../../../services/dice/dice.service';
import { FixerCalcBigLeagueContactNewComponent } from './../fixer-calc-big-league-contact-new/fixer-calc-big-league-contact-new.component';
import { FixerCalcBigLeagueContactComponent } from './../fixer-calc-big-league-contact/fixer-calc-big-league-contact.component';
import { CommonUiModule } from '../../../../modules/common-ui/common-ui.module';
import { FixerBigLeagueService } from './../../services/fixer-big-league/fixer-big-league.service';
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
        FixerCalcBigLeagueContactNewComponent,
      ],
      imports: [CommonUiModule],
      providers: [FixerBigLeagueService, DiceService],
    }).compileComponents();
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
