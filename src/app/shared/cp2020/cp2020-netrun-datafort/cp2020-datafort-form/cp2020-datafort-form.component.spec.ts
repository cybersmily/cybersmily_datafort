import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020DatafortFormComponent } from './cp2020-datafort-form.component';

describe('Cp2020DatafortFormComponent', () => {
  let component: Cp2020DatafortFormComponent;
  let fixture: ComponentFixture<Cp2020DatafortFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020DatafortFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020DatafortFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
