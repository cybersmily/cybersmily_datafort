import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillsByNameComponent } from './cp-red-skills-by-name.component';

describe('CpRedSkillsByNameComponent', () => {
  let component: CpRedSkillsByNameComponent;
  let fixture: ComponentFixture<CpRedSkillsByNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedSkillsByNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedSkillsByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
