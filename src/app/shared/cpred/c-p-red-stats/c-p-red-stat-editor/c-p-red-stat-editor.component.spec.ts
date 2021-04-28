import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPRedStatEditorComponent } from './c-p-red-stat-editor.component';

describe('CPRedStatEditorComponent', () => {
  let component: CPRedStatEditorComponent;
  let fixture: ComponentFixture<CPRedStatEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPRedStatEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CPRedStatEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
