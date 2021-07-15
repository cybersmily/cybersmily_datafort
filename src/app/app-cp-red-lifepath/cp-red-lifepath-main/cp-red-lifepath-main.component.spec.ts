import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedLifepathMainComponent } from './cp-red-lifepath-main.component';

describe('CpRedLifepathMainComponent', () => {
  let component: CpRedLifepathMainComponent;
  let fixture: ComponentFixture<CpRedLifepathMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedLifepathMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedLifepathMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
