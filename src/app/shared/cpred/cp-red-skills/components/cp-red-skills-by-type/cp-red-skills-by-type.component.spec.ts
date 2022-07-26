import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillsByTypeComponent } from './cp-red-skills-by-type.component';

describe('CpRedSkillsByTypeComponent', () => {
  let component: CpRedSkillsByTypeComponent;
  let fixture: ComponentFixture<CpRedSkillsByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedSkillsByTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedSkillsByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
