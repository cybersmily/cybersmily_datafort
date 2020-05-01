import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifepathChartComponent } from './lifepath-chart.component';
import { DiceService } from './../../shared/services/dice/dice.service';

describe('LifepathChartComponent', () => {
  let component: LifepathChartComponent;
  let fixture: ComponentFixture<LifepathChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifepathChartComponent ],
      imports: [FormsModule],
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
