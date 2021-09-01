import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SkillStatSectionComponent } from './cp2020-skill-stat-section.component';

describe('Cp2020SkillStatSectionComponent', () => {
  let component: Cp2020SkillStatSectionComponent;
  let fixture: ComponentFixture<Cp2020SkillStatSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020SkillStatSectionComponent ],
      imports: [
        CommonUiModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020SkillStatSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
