import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020VehicleDetailsComponent } from './cp2020-vehicle-details.component';

describe('Cp2020VehicleDetailsComponent', () => {
  let component: Cp2020VehicleDetailsComponent;
  let fixture: ComponentFixture<Cp2020VehicleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020VehicleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020VehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
