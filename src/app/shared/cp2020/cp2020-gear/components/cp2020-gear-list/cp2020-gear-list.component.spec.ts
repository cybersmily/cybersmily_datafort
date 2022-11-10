import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020GearListComponent } from './cp2020-gear-list.component';

describe('Cp2020GearListComponent', () => {
  let component: Cp2020GearListComponent;
  let fixture: ComponentFixture<Cp2020GearListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020GearListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020GearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
