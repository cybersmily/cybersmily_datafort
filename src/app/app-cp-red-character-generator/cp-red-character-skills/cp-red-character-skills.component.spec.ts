import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CpRedCharacterSkillsComponent } from './cp-red-character-skills.component';

describe('CpRedCharacterSkillsComponent', () => {
  let component: CpRedCharacterSkillsComponent;
  let fixture: ComponentFixture<CpRedCharacterSkillsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRedCharacterSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
