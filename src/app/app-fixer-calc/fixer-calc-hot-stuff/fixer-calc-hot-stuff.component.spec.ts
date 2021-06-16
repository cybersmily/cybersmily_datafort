import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { FixerCalcHotStuffAreaComponent } from './../fixer-calc-hot-stuff-area/fixer-calc-hot-stuff-area.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { FixerHotStuffService } from './../../shared/services/fixer/fixer-hot-stuff.service';
import { FixerBigLeagueService } from './../../shared/services/fixer/fixer-big-league.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixerCalcHotStuffComponent } from './fixer-calc-hot-stuff.component';

describe('FixerCalcHotStuffComponent', () => {
  let component: FixerCalcHotStuffComponent;
  let fixture: ComponentFixture<FixerCalcHotStuffComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonUiModule
      ],
      declarations: [
        FixerCalcHotStuffComponent,
        FixerCalcHotStuffAreaComponent
      ],
      providers: [
        FixerBigLeagueService,
        FixerHotStuffService
      ]
    })
    .compileComponents();
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
