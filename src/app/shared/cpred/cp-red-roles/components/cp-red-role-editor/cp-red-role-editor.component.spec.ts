import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedRoleEditorComponent } from './cp-red-role-editor.component';

describe('CpRedRoleEditorComponent', () => {
  let component: CpRedRoleEditorComponent;
  let fixture: ComponentFixture<CpRedRoleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedRoleEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedRoleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
