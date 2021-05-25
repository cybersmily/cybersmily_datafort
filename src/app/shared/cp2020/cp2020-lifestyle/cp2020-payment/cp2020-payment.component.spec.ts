import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020PaymentComponent } from './cp2020-payment.component';

describe('Cp2020PaymentComponent', () => {
  let component: Cp2020PaymentComponent;
  let fixture: ComponentFixture<Cp2020PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020PaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
