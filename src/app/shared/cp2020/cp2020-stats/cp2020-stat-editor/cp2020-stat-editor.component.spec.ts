import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020StatEditorComponent } from './cp2020-stat-editor.component';

describe('Cp2020StatEditorComponent', () => {
  let component: Cp2020StatEditorComponent;
  let fixture: ComponentFixture<Cp2020StatEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020StatEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020StatEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
