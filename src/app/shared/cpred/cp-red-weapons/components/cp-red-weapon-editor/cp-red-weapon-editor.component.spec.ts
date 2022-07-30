import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedWeaponEditorComponent } from './cp-red-weapon-editor.component';

describe('CpRedWeaponEditorComponent', () => {
  let component: CpRedWeaponEditorComponent;
  let fixture: ComponentFixture<CpRedWeaponEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedWeaponEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedWeaponEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
