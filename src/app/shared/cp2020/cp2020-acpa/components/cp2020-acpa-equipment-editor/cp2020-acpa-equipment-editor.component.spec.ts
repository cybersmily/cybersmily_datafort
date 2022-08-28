import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaEquipmentEditorComponent } from './cp2020-acpa-equipment-editor.component';

describe('Cp2020AcpaEquipmentEditorComponent', () => {
  let component: Cp2020AcpaEquipmentEditorComponent;
  let fixture: ComponentFixture<Cp2020AcpaEquipmentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020AcpaEquipmentEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020AcpaEquipmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
