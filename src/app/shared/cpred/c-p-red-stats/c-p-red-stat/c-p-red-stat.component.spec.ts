import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPRedStatComponent } from './c-p-red-stat.component';

describe('CPRedStatComponent', () => {
  let component: CPRedStatComponent;
  let fixture: ComponentFixture<CPRedStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPRedStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CPRedStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
