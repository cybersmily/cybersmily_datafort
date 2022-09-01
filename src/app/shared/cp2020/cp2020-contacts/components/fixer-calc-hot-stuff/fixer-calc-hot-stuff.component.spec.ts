import { DataService } from './../../../../services/file-services';
import { DiceService } from './../../../../services/dice/dice.service';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { FixerCalcHotStuffAreaComponent } from './../fixer-calc-hot-stuff-area/fixer-calc-hot-stuff-area.component';
import { FixerHotStuffService } from './../../services/fixer-hot-stuff/fixer-hot-stuff.service';
import { FixerBigLeagueService } from './../../services/fixer-big-league/fixer-big-league.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixerCalcHotStuffComponent } from './fixer-calc-hot-stuff.component';

describe('FixerCalcHotStuffComponent', () => {
  let component: FixerCalcHotStuffComponent;
  let fixture: ComponentFixture<FixerCalcHotStuffComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiModule],
      declarations: [
        FixerCalcHotStuffComponent,
        FixerCalcHotStuffAreaComponent,
      ],
      providers: [
        FixerBigLeagueService,
        FixerHotStuffService,
        DiceService,
        DataService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixerCalcHotStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
