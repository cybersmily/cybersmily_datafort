import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedLifepathDisplayComponent } from './cp-red-lifepath-display.component';

describe('CpRedLifepathDisplayComponent', () => {
  let component: CpRedLifepathDisplayComponent;
  let fixture: ComponentFixture<CpRedLifepathDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedLifepathDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedLifepathDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
