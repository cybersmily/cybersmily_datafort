import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedArmorEditorComponent } from './cp-red-armor-editor.component';

describe('CpRedArmorEditorComponent', () => {
  let component: CpRedArmorEditorComponent;
  let fixture: ComponentFixture<CpRedArmorEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedArmorEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedArmorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
