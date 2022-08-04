import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedAddictionsEditorComponent } from './cp-red-addictions-editor.component';

describe('CpRedAddictionsEditorComponent', () => {
  let component: CpRedAddictionsEditorComponent;
  let fixture: ComponentFixture<CpRedAddictionsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedAddictionsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedAddictionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
