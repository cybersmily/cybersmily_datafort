import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020VehicleTableComponent } from './cp2020-vehicle-table.component';

describe('Cp2020VehicleTableComponent', () => {
  let component: Cp2020VehicleTableComponent;
  let fixture: ComponentFixture<Cp2020VehicleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020VehicleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020VehicleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
