import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedWeaponsDisplayComponent } from './cp-red-weapons-display.component';

describe('CpRedWeaponsDisplayComponent', () => {
  let component: CpRedWeaponsDisplayComponent;
  let fixture: ComponentFixture<CpRedWeaponsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedWeaponsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedWeaponsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
