import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020StatComponent } from './cp2020-stat.component';

describe('Cp2020StatComponent', () => {
  let component: Cp2020StatComponent;
  let fixture: ComponentFixture<Cp2020StatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020StatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020StatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
