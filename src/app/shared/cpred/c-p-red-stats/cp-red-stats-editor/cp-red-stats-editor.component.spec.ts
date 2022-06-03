import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedStatsEditorComponent } from './cp-red-stats-editor.component';

describe('CpRedStatsEditorComponent', () => {
  let component: CpRedStatsEditorComponent;
  let fixture: ComponentFixture<CpRedStatsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedStatsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedStatsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
