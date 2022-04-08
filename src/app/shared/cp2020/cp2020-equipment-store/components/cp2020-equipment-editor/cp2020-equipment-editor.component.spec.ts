import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020EquipmentEditorComponent } from './cp2020-equipment-editor.component';

describe('Cp2020EquipmentEditorComponent', () => {
  let component: Cp2020EquipmentEditorComponent;
  let fixture: ComponentFixture<Cp2020EquipmentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020EquipmentEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020EquipmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
