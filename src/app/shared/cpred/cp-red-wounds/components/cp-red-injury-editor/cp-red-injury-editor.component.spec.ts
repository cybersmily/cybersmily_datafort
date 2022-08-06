import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedInjuryEditorComponent } from './cp-red-injury-editor.component';

describe('CpRedInjuryEditorComponent', () => {
  let component: CpRedInjuryEditorComponent;
  let fixture: ComponentFixture<CpRedInjuryEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpRedInjuryEditorComponent],
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
