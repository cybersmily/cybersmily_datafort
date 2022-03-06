import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020InitiativeEditorComponent } from './cp2020-initiative-editor.component';

describe('Cp2020InitiativeEditorComponent', () => {
  let component: Cp2020InitiativeEditorComponent;
  let fixture: ComponentFixture<Cp2020InitiativeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020InitiativeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020InitiativeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
