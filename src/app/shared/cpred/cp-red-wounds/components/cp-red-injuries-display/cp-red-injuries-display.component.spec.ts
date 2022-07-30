import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedInjuriesDisplayComponent } from './cp-red-injuries-display.component';

describe('CpRedInjuriesDisplayComponent', () => {
  let component: CpRedInjuriesDisplayComponent;
  let fixture: ComponentFixture<CpRedInjuriesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedInjuriesDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedInjuriesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
