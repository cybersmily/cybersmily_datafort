import { Cp2020ArmorModule } from './../../shared/cp2020/cp2020-armor/cp2020-armor.module';
import { Cp2020CyberwareModule } from './../../shared/cp2020/cp2020-cyberware/cp2020-cyberware.module';
import { Cp2020WoundsModule } from './../../shared/cp2020/cp2020wounds/cp2020wounds.module';
import { Cp2020StatsModule } from './../../shared/cp2020/cp2020-stats/cp2020-stats.module';
import { Cp2020weaponsModule } from './../../shared/cp2020/cp2020weapons/cp2020weapons.module';
import { SeoService } from './../../shared/services/seo/seo.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services/data.service';
import { AppCharacterSkillComponent } from './../app-character-skill/app-character-skill.component';
import { AppCharacterSkillsComponent } from './../app-character-skills/app-character-skills.component';
import { AppCharacterRoleComponent } from './../app-character-role/app-character-role.component';
import { AppCharacterLifepathComponent } from './../app-character-lifepath/app-character-lifepath.component';
import { AppCharacterImageComponent } from './../app-character-image/app-character-image.component';
import { AppCharacterHandleComponent } from './../app-character-handle/app-character-handle.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterGeneratorFormComponent } from './app-character-generator-form.component';
import { AppCharacterGearComponent } from '../app-character-gear/app-character-gear.component';

describe('AppCharacterGeneratorFormComponent', () => {
  let component: AppCharacterGeneratorFormComponent;
  let fixture: ComponentFixture<AppCharacterGeneratorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppCharacterGeneratorFormComponent,
        AppCharacterHandleComponent,
        AppCharacterImageComponent,
        AppCharacterLifepathComponent,
        AppCharacterRoleComponent,
        AppCharacterSkillComponent,
        AppCharacterSkillsComponent,
        AppCharacterGearComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientModule,
        Cp2020weaponsModule,
        Cp2020StatsModule,
        Cp2020WoundsModule,
        Cp2020CyberwareModule,
        Cp2020ArmorModule
      ],
      providers: [
        DataService,
        DiceService,
        SeoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCharacterGeneratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
