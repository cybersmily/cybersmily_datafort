import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ammoComponent } from './cp2020ammo.component';

describe('Cp2020ammoComponent', () => {
  let component: Cp2020ammoComponent;
  let fixture: ComponentFixture<Cp2020ammoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ammoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ammoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
