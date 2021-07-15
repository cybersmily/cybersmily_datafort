import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedLifepathJumpstartComponent } from './cp-red-lifepath-jumpstart.component';

describe('CpRedLifepathJumpstartComponent', () => {
  let component: CpRedLifepathJumpstartComponent;
  let fixture: ComponentFixture<CpRedLifepathJumpstartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedLifepathJumpstartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedLifepathJumpstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
