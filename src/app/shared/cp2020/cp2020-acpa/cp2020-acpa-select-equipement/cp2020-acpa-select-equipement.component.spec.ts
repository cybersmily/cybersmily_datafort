import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaSelectEquipementComponent } from './cp2020-acpa-select-equipement.component';

describe('Cp2020AcpaSelectEquipementComponent', () => {
  let component: Cp2020AcpaSelectEquipementComponent;
  let fixture: ComponentFixture<Cp2020AcpaSelectEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020AcpaSelectEquipementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020AcpaSelectEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
