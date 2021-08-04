import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020weaponOptionsComponent } from './cp2020weapon-options.component';

describe('Cp2020weaponOptionsComponent', () => {
  let component: Cp2020weaponOptionsComponent;
  let fixture: ComponentFixture<Cp2020weaponOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020weaponOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weaponOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
