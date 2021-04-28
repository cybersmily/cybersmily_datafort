import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterWeaponsArmorComponent } from './cp-red-character-weapons-armor.component';

describe('CpRedCharacterWeaponsArmorComponent', () => {
  let component: CpRedCharacterWeaponsArmorComponent;
  let fixture: ComponentFixture<CpRedCharacterWeaponsArmorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRedCharacterWeaponsArmorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterWeaponsArmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
