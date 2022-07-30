import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedWeaponDisplayComponent } from './cp-red-weapon-display.component';

describe('CpRedWeaponDisplayComponent', () => {
  let component: CpRedWeaponDisplayComponent;
  let fixture: ComponentFixture<CpRedWeaponDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedWeaponDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedWeaponDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
