import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020EquipmentListComponent } from './cp2020-equipment-list.component';

describe('Cp2020EquipmentListComponent', () => {
  let component: Cp2020EquipmentListComponent;
  let fixture: ComponentFixture<Cp2020EquipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020EquipmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020EquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
