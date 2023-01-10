import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020GearEditorComponent } from './cp2020-gear-editor.component';

describe('Cp2020GearEditorComponent', () => {
  let component: Cp2020GearEditorComponent;
  let fixture: ComponentFixture<Cp2020GearEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020GearEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020GearEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
