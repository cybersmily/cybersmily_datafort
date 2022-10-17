import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpRedWoundsModule } from './../../cp-red-wounds.module';

import { CpRedAddictionEditorComponent } from './cp-red-addiction-editor.component';

describe('CpRedAddictionsEditorComponent', () => {
  let component: CpRedAddictionEditorComponent;
  let fixture: ComponentFixture<CpRedAddictionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedAddictionEditorComponent],
      imports: [
        CpRedWoundsModule,
        CommonUiModule,
        CommonModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedAddictionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
