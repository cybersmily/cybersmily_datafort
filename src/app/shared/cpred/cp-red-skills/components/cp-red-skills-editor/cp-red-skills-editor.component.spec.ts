import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillsEditorComponent } from './cp-red-skills-editor.component';

describe('CpRedSkillsEditorComponent', () => {
  let component: CpRedSkillsEditorComponent;
  let fixture: ComponentFixture<CpRedSkillsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedSkillsEditorComponent],
      imports: [CommonUiModule, BrowserAnimationsModule, CommonModule],
    }).compileComponents();
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
