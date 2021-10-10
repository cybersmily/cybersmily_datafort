import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Cp2020SkillsModule } from './../../shared/cp2020/cp2020-skills/cp2020-skills.module';
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
import { AppCharacterLifepathComponent } from './../app-character-lifepath/app-character-lifepath.component';
import { AppCharacterImageComponent } from './../app-character-image/app-character-image.component';
import { AppCharacterHandleComponent } from './../app-character-handle/app-character-handle.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppCharacterGeneratorFormComponent } from './app-character-generator-form.component';
import { AppCharacterGearComponent } from '../app-character-gear/app-character-gear.component';

describe('AppCharacterGeneratorFormComponent', () => {
  let component: AppCharacterGeneratorFormComponent;
  let fixture: ComponentFixture<AppCharacterGeneratorFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppCharacterGeneratorFormComponent,
        AppCharacterHandleComponent,
        AppCharacterImageComponent,
        AppCharacterLifepathComponent,
        AppCharacterGearComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientModule,
        BrowserAnimationsModule,
        Cp2020weaponsModule,
        Cp2020StatsModule,
        Cp2020WoundsModule,
        Cp2020CyberwareModule,
        Cp2020SkillsModule,
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
