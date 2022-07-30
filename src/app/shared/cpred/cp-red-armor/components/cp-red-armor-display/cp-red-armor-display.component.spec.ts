import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedArmorDisplayComponent } from './cp-red-armor-display.component';

describe('CpRedArmorDisplayComponent', () => {
  let component: CpRedArmorDisplayComponent;
  let fixture: ComponentFixture<CpRedArmorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedArmorDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedArmorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
