import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020EquipmentItemComponent } from './cp2020-equipment-item.component';

describe('Cp2020EquipmentItemComponent', () => {
  let component: Cp2020EquipmentItemComponent;
  let fixture: ComponentFixture<Cp2020EquipmentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020EquipmentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020EquipmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
