import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixerCalcBigLeagueContactComponent } from './fixer-calc-big-league-contact.component';

describe('FixerCalcBigLeagueContactComponent', () => {
  let component: FixerCalcBigLeagueContactComponent;
  let fixture: ComponentFixture<FixerCalcBigLeagueContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FixerCalcBigLeagueContactComponent],
      imports: [CommonUiModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixerCalcBigLeagueContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
