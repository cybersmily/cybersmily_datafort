import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterSettingsComponent } from './app-character-settings.component';

describe('AppCharacterSettingsComponent', () => {
  let component: AppCharacterSettingsComponent;
  let fixture: ComponentFixture<AppCharacterSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCharacterSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
