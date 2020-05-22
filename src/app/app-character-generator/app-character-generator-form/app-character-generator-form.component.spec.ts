import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { DiceService } from './../../shared/services/dice/dice.service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { AppCharacterWoundLevelComponent } from './../app-character-wound-level/app-character-wound-level.component';
import { AppCharacterCyberwareComponent } from './../app-character-cyberware/app-character-cyberware.component';
import { AppCharacterSkillComponent } from './../app-character-skill/app-character-skill.component';
import { AppCharacterArmorComponent } from './../app-character-armor/app-character-armor.component';
import { AppCharacterWeaponsComponent } from './../app-character-weapons/app-character-weapons.component';
import { AppCharacterStatsComponent } from './../app-character-stats/app-character-stats.component';
import { AppCharacterSkillsComponent } from './../app-character-skills/app-character-skills.component';
import { AppCharacterRoleComponent } from './../app-character-role/app-character-role.component';
import { AppCharacterLifepathComponent } from './../app-character-lifepath/app-character-lifepath.component';
import { AppCharacterImageComponent } from './../app-character-image/app-character-image.component';
import { AppCharacterHandleComponent } from './../app-character-handle/app-character-handle.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharacterGeneratorFormComponent } from './app-character-generator-form.component';
import { AppCharacterGearComponent } from '../app-character-gear/app-character-gear.component';
import { AppCharacterSaveWoundsComponent } from '../app-character-save-wounds/app-character-save-wounds.component';

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
        AppCharacterStatsComponent,
        AppCharacterWeaponsComponent,
        AppCharacterGearComponent,
        AppCharacterSaveWoundsComponent,
        AppCharacterWoundLevelComponent,
        AppCharacterArmorComponent,
        AppCharacterCyberwareComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientModule,
        ModalModule.forRoot()
      ],
      providers: [
        DataService,
        DiceService,
        BsModalService
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
