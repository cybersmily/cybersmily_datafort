import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020HousingListComponent } from './cp2020-housing-list.component';

describe('Cp2020HousingListComponent', () => {
  let component: Cp2020HousingListComponent;
  let fixture: ComponentFixture<Cp2020HousingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020HousingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020HousingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
