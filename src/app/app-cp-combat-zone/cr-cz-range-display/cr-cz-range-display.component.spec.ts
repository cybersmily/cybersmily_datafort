import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCzRangeDisplayComponent } from './cr-cz-range-display.component';

describe('CrCzRangeDisplayComponent', () => {
  let component: CrCzRangeDisplayComponent;
  let fixture: ComponentFixture<CrCzRangeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrCzRangeDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrCzRangeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
