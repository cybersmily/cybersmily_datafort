import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020LifepathSectionComponent } from './cp2020-lifepath-section.component';

describe('Cp2020LifepathSectionComponent', () => {
  let component: Cp2020LifepathSectionComponent;
  let fixture: ComponentFixture<Cp2020LifepathSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020LifepathSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020LifepathSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
