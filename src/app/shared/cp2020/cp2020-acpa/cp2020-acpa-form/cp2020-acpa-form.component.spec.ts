import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaFormComponent } from './cp2020-acpa-form.component';

describe('Cp2020AcpaFormComponent', () => {
  let component: Cp2020AcpaFormComponent;
  let fixture: ComponentFixture<Cp2020AcpaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020AcpaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020AcpaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
