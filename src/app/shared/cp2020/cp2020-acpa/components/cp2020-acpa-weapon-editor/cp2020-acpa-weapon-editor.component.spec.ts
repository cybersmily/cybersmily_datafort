import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaWeaponEditorComponent } from './cp2020-acpa-weapon-editor.component';

describe('Cp2020AcpaWeaponEditorComponent', () => {
  let component: Cp2020AcpaWeaponEditorComponent;
  let fixture: ComponentFixture<Cp2020AcpaWeaponEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020AcpaWeaponEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020AcpaWeaponEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
