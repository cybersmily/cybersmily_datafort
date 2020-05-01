import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempGeneratorGearComponent } from './temp-generator-gear.component';

describe('TempGeneratorGearComponent', () => {
  let component: TempGeneratorGearComponent;
  let fixture: ComponentFixture<TempGeneratorGearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempGeneratorGearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempGeneratorGearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
