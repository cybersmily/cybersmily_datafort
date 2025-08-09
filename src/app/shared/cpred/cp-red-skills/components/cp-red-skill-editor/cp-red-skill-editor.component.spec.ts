import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillEditorComponent } from './cp-red-skill-editor.component';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CpRedSkillEditorComponent', () => {
  let component: CpRedSkillEditorComponent;
  let fixture: ComponentFixture<CpRedSkillEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CpRedSkillEditorComponent],
    imports: [CommonUiModule,
        BrowserAnimationsModule,
        CommonModule],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
