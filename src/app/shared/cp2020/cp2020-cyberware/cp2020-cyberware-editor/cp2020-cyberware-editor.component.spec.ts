import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020CyberwareEditorComponent } from './cp2020-cyberware-editor.component';

describe('Cp2020CyberwareEditorComponent', () => {
  let component: Cp2020CyberwareEditorComponent;
  let fixture: ComponentFixture<Cp2020CyberwareEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020CyberwareEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020CyberwareEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
