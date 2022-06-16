import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedSkillsComponent } from './cp-red-skills.component';

describe('CpRedSkillsComponent', () => {
  let component: CpRedSkillsComponent;
  let fixture: ComponentFixture<CpRedSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
