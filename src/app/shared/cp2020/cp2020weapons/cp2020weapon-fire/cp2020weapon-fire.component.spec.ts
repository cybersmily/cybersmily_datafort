import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020weaponFireComponent } from './cp2020weapon-fire.component';

describe('Cp2020weaponFireComponent', () => {
  let component: Cp2020weaponFireComponent;
  let fixture: ComponentFixture<Cp2020weaponFireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020weaponFireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weaponFireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
