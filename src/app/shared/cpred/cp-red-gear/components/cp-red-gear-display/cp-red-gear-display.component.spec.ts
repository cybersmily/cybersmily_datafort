import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedGearDisplayComponent } from './cp-red-gear-display.component';

describe('CpRedGearDisplayComponent', () => {
  let component: CpRedGearDisplayComponent;
  let fixture: ComponentFixture<CpRedGearDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedGearDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedGearDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
