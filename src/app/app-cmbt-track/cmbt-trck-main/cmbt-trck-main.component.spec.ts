import { Cp2020WoundsModule } from './../../shared/cp2020/cp2020wounds/cp2020wounds.module';
import { Cp2020StatsModule } from './../../shared/cp2020/cp2020-stats/cp2020-stats.module';
import { Cp2020weaponsModule } from './../../shared/cp2020/cp2020weapons/cp2020weapons.module';
import { Cp2020ArmorModule } from './../../shared/cp2020/cp2020-armor/cp2020-armor.module';
import { SeoService } from './../../shared/services/seo/seo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CmbtTrckInstructionsComponent } from './../cmbt-trck-instructions/cmbt-trck-instructions.component';
import { CmbtTrckFormComponent } from './../cmbt-trck-form/cmbt-trck-form.component';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { CmbtTrckGearComponent } from './../cmbt-trck-gear/cmbt-trck-gear.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services/data.service';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { CmbtTrkCyberComponent } from './../cmbt-trk-cyber/cmbt-trk-cyber.component';
import { CmbtTrkSkillsComponent } from './../cmbt-trk-skills/cmbt-trk-skills.component';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CmbtTrckOpponentCardComponent } from './../cmbt-trck-opponent-card/cmbt-trck-opponent-card.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CmbtTrckMainComponent } from './cmbt-trck-main.component';

describe('CmbtTrckMainComponent', () => {
  let component: CmbtTrckMainComponent;
  let fixture: ComponentFixture<CmbtTrckMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonUiModule,
        PipesModule,
        HttpClientModule,
        Cp2020weaponsModule,
        Cp2020StatsModule,
        Cp2020WoundsModule,
        Cp2020ArmorModule,
        BrowserAnimationsModule
      ],
      declarations: [
        CmbtTrckMainComponent,
        CmbtTrckFormComponent,
        CmbtTrckOpponentCardComponent,
        CmbtTrkSkillsComponent,
        CmbtTrkCyberComponent,
        CmbtTrckGearComponent,
        CmbtTrckInstructionsComponent
      ],
      providers: [
        DiceService,
        DataService,
        SeoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
