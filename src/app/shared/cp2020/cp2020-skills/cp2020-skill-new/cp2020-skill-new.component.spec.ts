import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SkillNewComponent } from './cp2020-skill-new.component';

describe('Cp2020SkillNewComponent', () => {
  let component: Cp2020SkillNewComponent;
  let fixture: ComponentFixture<Cp2020SkillNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020SkillNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020SkillNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
