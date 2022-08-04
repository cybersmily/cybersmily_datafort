import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedInjuriesEditorComponent } from './cp-red-injuries-editor.component';

describe('CpRedInjuriesEditorComponent', () => {
  let component: CpRedInjuriesEditorComponent;
  let fixture: ComponentFixture<CpRedInjuriesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedInjuriesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedInjuriesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
