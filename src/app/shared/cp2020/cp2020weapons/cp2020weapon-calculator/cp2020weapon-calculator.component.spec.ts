import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020weaponCalculatorComponent } from './cp2020weapon-calculator.component';

describe('Cp2020weaponCalculatorComponent', () => {
  let component: Cp2020weaponCalculatorComponent;
  let fixture: ComponentFixture<Cp2020weaponCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020weaponCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weaponCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
