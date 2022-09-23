import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterGenSettingFormComponent } from './cp-red-character-gen-setting-form.component';

describe('CpRedCharacterGenSettingFormComponent', () => {
  let component: CpRedCharacterGenSettingFormComponent;
  let fixture: ComponentFixture<CpRedCharacterGenSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedCharacterGenSettingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpRedCharacterGenSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
