import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020weaponSettingsComponent } from './cp2020weapon-settings.component';

describe('Cp2020weaponSettingsComponent', () => {
  let component: Cp2020weaponSettingsComponent;
  let fixture: ComponentFixture<Cp2020weaponSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020weaponSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020weaponSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
