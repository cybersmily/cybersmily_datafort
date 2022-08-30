import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaCarriedEditorComponent } from './cp2020-acpa-carried-editor.component';

describe('Cp2020AcpaCarriedEditorComponent', () => {
  let component: Cp2020AcpaCarriedEditorComponent;
  let fixture: ComponentFixture<Cp2020AcpaCarriedEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020AcpaCarriedEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020AcpaCarriedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
