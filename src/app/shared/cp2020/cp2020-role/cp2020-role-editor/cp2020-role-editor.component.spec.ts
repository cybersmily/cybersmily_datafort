import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020RoleEditorComponent } from './cp2020-role-editor.component';

describe('Cp2020RoleEditorComponent', () => {
  let component: Cp2020RoleEditorComponent;
  let fixture: ComponentFixture<Cp2020RoleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020RoleEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020RoleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
