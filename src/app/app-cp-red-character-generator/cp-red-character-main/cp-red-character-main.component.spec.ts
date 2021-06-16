import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CpRedCharacterMainComponent } from './cp-red-character-main.component';

describe('CpRedCharacterMainComponent', () => {
  let component: CpRedCharacterMainComponent;
  let fixture: ComponentFixture<CpRedCharacterMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRedCharacterMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
