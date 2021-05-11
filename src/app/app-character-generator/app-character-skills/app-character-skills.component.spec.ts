import { Cp2020CyberwareModule } from './../../shared/cp2020/cp2020-cyberware/cp2020-cyberware.module';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { AppCharacterSkillComponent } from './../app-character-skill/app-character-skill.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterSkillsComponent } from './app-character-skills.component';

describe('AppCharacterSkillsComponent', () => {
  let component: AppCharacterSkillsComponent;
  let fixture: ComponentFixture<AppCharacterSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppCharacterSkillsComponent,
        AppCharacterSkillComponent
      ],
      imports: [
        CommonUiModule,
        Cp2020CyberwareModule
      ],
      providers: [
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
