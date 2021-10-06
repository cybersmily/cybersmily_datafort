import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020RepSectionComponent } from './cp2020-rep-section.component';

describe('Cp2020RepSectionComponent', () => {
  let component: Cp2020RepSectionComponent;
  let fixture: ComponentFixture<Cp2020RepSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020RepSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020RepSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
