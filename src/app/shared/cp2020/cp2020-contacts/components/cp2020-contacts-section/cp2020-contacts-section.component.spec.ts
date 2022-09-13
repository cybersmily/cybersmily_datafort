import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ContactsSectionComponent } from './cp2020-contacts-section.component';

describe('Cp2020ContactsSectionComponent', () => {
  let component: Cp2020ContactsSectionComponent;
  let fixture: ComponentFixture<Cp2020ContactsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ContactsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020ContactsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
