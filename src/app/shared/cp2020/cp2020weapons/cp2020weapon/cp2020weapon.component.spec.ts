import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020weaponComponent } from './cp2020weapon.component';

describe('Cp2020weaponComponent', () => {
  let component: Cp2020weaponComponent;
  let fixture: ComponentFixture<Cp2020weaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020weaponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
