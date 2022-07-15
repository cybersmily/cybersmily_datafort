import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillEditorComponent } from './cp-red-skill-editor.component';

describe('CpRedSkillEditorComponent', () => {
  let component: CpRedSkillEditorComponent;
  let fixture: ComponentFixture<CpRedSkillEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedSkillEditorComponent],
      imports: [HttpClientTestingModule],
      providers: [DataService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedSkillEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
