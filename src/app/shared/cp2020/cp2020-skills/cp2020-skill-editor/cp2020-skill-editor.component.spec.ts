import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SkillEditorComponent } from './cp2020-skill-editor.component';

describe('Cp2020SkillEditorComponent', () => {
  let component: Cp2020SkillEditorComponent;
  let fixture: ComponentFixture<Cp2020SkillEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020SkillEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020SkillEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
