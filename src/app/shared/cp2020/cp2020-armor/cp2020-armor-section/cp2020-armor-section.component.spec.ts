import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ArmorSectionComponent } from './cp2020-armor-section.component';

describe('Cp2020ArmorSectionComponent', () => {
  let component: Cp2020ArmorSectionComponent;
  let fixture: ComponentFixture<Cp2020ArmorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ArmorSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ArmorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
