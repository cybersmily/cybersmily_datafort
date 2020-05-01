import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempGeneratorSkillsComponent } from './temp-generator-skills.component';

describe('TempGeneratorSkillsComponent', () => {
  let component: TempGeneratorSkillsComponent;
  let fixture: ComponentFixture<TempGeneratorSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempGeneratorSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempGeneratorSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});