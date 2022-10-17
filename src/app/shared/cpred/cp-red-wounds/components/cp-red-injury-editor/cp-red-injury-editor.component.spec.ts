import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpRedWoundsModule } from './../../cp-red-wounds.module';

import { CpRedInjuryEditorComponent } from './cp-red-injury-editor.component';

describe('CpRedInjuryEditorComponent', () => {
  let component: CpRedInjuryEditorComponent;
  let fixture: ComponentFixture<CpRedInjuryEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedInjuryEditorComponent],
      imports: [
        CpRedWoundsModule,
        CommonUiModule,
        CommonModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedInjuryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
