import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020RoleSectionComponent } from './cp2020-role-section.component';

describe('Cp2020RoleSectionComponent', () => {
  let component: Cp2020RoleSectionComponent;
  let fixture: ComponentFixture<Cp2020RoleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020RoleSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020RoleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
