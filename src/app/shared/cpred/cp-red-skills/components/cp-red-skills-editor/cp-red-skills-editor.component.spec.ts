import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillsEditorComponent } from './cp-red-skills-editor.component';

describe('CpRedSkillsEditorComponent', () => {
  let component: CpRedSkillsEditorComponent;
  let fixture: ComponentFixture<CpRedSkillsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedSkillsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedSkillsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
