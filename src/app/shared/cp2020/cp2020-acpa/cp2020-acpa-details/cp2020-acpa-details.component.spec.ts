import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ACPADetailsComponent } from './cp2020-acpa-details.component';

describe('Cp2020ACPADetailsComponent', () => {
  let component: Cp2020ACPADetailsComponent;
  let fixture: ComponentFixture<Cp2020ACPADetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ACPADetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ACPADetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
