import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaLocationEditorComponent } from './cp2020-acpa-location-editor.component';

describe('Cp2020AcpaLocationEditorComponent', () => {
  let component: Cp2020AcpaLocationEditorComponent;
  let fixture: ComponentFixture<Cp2020AcpaLocationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020AcpaLocationEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020AcpaLocationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
