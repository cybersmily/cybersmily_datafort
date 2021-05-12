import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ExpenseListComponent } from './cp2020-expense-list.component';

describe('Cp2020ExpenseListComponent', () => {
  let component: Cp2020ExpenseListComponent;
  let fixture: ComponentFixture<Cp2020ExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ExpenseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
