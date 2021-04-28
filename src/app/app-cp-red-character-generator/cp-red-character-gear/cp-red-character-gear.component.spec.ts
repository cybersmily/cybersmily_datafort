import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterGearComponent } from './cp-red-character-gear.component';

describe('CpRedCharacterGearComponent', () => {
  let component: CpRedCharacterGearComponent;
  let fixture: ComponentFixture<CpRedCharacterGearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRedCharacterGearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterGearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
