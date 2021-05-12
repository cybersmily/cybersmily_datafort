import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020FoodListComponent } from './cp2020-food-list.component';

describe('Cp2020FoodListComponent', () => {
  let component: Cp2020FoodListComponent;
  let fixture: ComponentFixture<Cp2020FoodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020FoodListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020FoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
