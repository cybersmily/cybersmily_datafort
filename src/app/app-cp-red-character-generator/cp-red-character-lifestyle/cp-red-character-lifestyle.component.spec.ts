import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterLifestyleComponent } from './cp-red-character-lifestyle.component';

describe('CpRedCharacterLifestyleComponent', () => {
  let component: CpRedCharacterLifestyleComponent;
  let fixture: ComponentFixture<CpRedCharacterLifestyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRedCharacterLifestyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterLifestyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
