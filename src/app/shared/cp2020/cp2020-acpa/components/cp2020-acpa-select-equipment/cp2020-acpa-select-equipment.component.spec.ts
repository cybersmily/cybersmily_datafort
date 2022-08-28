import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaSelectEquipmentComponent } from './cp2020-acpa-select-equipment.component';

describe('Cp2020AcpaSelectEquipementComponent', () => {
  let component: Cp2020AcpaSelectEquipmentComponent;
  let fixture: ComponentFixture<Cp2020AcpaSelectEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cp2020AcpaSelectEquipmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020AcpaSelectEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
