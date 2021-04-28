import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterLifepathComponent } from './cp-red-character-lifepath.component';

describe('CpRedCharacterLifepathComponent', () => {
  let component: CpRedCharacterLifepathComponent;
  let fixture: ComponentFixture<CpRedCharacterLifepathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRedCharacterLifepathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterLifepathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
