import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020CyberDeckSectionComponent } from './cp2020-cyber-deck-section.component';

describe('Cp2020CyberDeckSectionComponent', () => {
  let component: Cp2020CyberDeckSectionComponent;
  let fixture: ComponentFixture<Cp2020CyberDeckSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020CyberDeckSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020CyberDeckSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
