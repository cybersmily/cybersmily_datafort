import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020CyberwareSettingsComponent } from './cp2020-cyberware-settings.component';

describe('Cp2020CyberwareSettingsComponent', () => {
  let component: Cp2020CyberwareSettingsComponent;
  let fixture: ComponentFixture<Cp2020CyberwareSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020CyberwareSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020CyberwareSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
