import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedFashionDisplayComponent } from './cp-red-fashion-display.component';

describe('CpRedFashionDisplayComponent', () => {
  let component: CpRedFashionDisplayComponent;
  let fixture: ComponentFixture<CpRedFashionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedFashionDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedFashionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
