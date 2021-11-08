import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaSourceWeaponsComponent } from './cp2020-acpa-source-weapons.component';

describe('Cp2020AcpaSourceWeaponsComponent', () => {
  let component: Cp2020AcpaSourceWeaponsComponent;
  let fixture: ComponentFixture<Cp2020AcpaSourceWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020AcpaSourceWeaponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020AcpaSourceWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
