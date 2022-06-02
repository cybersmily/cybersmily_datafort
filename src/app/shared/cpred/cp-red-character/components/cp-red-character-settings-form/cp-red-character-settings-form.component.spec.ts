import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterSettingsFormComponent } from './cp-red-character-settings-form.component';

describe('CpRedCharacterSettingsFormComponent', () => {
  let component: CpRedCharacterSettingsFormComponent;
  let fixture: ComponentFixture<CpRedCharacterSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedCharacterSettingsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
