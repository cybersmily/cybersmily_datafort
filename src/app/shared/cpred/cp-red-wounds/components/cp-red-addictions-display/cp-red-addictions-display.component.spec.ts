import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedAddictionsDisplayComponent } from './cp-red-addictions-display.component';

describe('CpRedAddictionsDisplayComponent', () => {
  let component: CpRedAddictionsDisplayComponent;
  let fixture: ComponentFixture<CpRedAddictionsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedAddictionsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedAddictionsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
