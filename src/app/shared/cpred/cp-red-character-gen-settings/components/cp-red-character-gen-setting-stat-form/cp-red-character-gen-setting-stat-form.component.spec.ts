import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterGenSettingStatFormComponent } from './cp-red-character-gen-setting-stat-form.component';

describe('CpRedCharacterGenSettingStatFormComponent', () => {
  let component: CpRedCharacterGenSettingStatFormComponent;
  let fixture: ComponentFixture<CpRedCharacterGenSettingStatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedCharacterGenSettingStatFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpRedCharacterGenSettingStatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
