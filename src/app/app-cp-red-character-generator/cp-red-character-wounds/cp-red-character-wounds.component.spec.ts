import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CpRedCharacterWoundsComponent } from './cp-red-character-wounds.component';

describe('CpRedCharacterWoundsComponent', () => {
  let component: CpRedCharacterWoundsComponent;
  let fixture: ComponentFixture<CpRedCharacterWoundsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRedCharacterWoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterWoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
