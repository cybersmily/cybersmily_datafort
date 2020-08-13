import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020weaponSelectorComponent } from './cp2020weapon-selector.component';

describe('Cp2020weaponSelectorComponent', () => {
  let component: Cp2020weaponSelectorComponent;
  let fixture: ComponentFixture<Cp2020weaponSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020weaponSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weaponSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
