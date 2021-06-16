import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LifepathChartComponent } from './lifepath-chart.component';
import { DiceService } from './../../shared/services/dice/dice.service';

describe('LifepathChartComponent', () => {
  let component: LifepathChartComponent;
  let fixture: ComponentFixture<LifepathChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LifepathChartComponent ],
      imports: [CommonUiModule],
      providers: [DiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifepathChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.header = "Test";
    component.chartData = new Array();
    expect(component).toBeTruthy();
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
