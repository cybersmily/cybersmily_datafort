import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ArmorSuiteGeneratorComponent } from './cp2020-armor-suite-generator.component';

describe('Cp2020ArmorSuiteGeneratorComponent', () => {
  let component: Cp2020ArmorSuiteGeneratorComponent;
  let fixture: ComponentFixture<Cp2020ArmorSuiteGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ArmorSuiteGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ArmorSuiteGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
