import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020DatafortEditorComponent } from './cp2020-datafort-editor.component';

describe('Cp2020DatafortEditorComponent', () => {
  let component: Cp2020DatafortEditorComponent;
  let fixture: ComponentFixture<Cp2020DatafortEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020DatafortEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020DatafortEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
