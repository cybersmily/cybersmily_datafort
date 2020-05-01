import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempGeneratorStatsComponent } from './temp-generator-stats.component';

describe('TempGeneratorStatsComponent', () => {
  let component: TempGeneratorStatsComponent;
  let fixture: ComponentFixture<TempGeneratorStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TempGeneratorStatsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempGeneratorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
