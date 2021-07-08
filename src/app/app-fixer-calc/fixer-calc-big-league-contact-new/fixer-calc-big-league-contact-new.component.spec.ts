import { FixerBigLeagueService } from './../../shared/services/fixer/fixer-big-league.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixerCalcBigLeagueContactNewComponent } from './fixer-calc-big-league-contact-new.component';

describe('FixerCalcBigLeagueContactNewComponent', () => {
  let component: FixerCalcBigLeagueContactNewComponent;
  let fixture: ComponentFixture<FixerCalcBigLeagueContactNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FixerCalcBigLeagueContactNewComponent ],
      imports: [CommonUiModule],
      providers: [
        DiceService,
        FixerBigLeagueService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixerCalcBigLeagueContactNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
