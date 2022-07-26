import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillsByStatComponent } from './cp-red-skills-by-stat.component';

describe('CpRedSkillsByStatComponent', () => {
  let component: CpRedSkillsByStatComponent;
  let fixture: ComponentFixture<CpRedSkillsByStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedSkillsByStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedSkillsByStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
