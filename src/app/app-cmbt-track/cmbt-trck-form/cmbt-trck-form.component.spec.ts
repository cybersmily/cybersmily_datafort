import { CmbtTrckArmorComponent } from './../cmbt-trck-armor/cmbt-trck-armor.component';
import { CmbtTrckModWpnComponent } from './../cmbt-trck-mod-wpn/cmbt-trck-mod-wpn.component';
import { CmbtTrckModSelectorComponent } from './../cmbt-trck-mod-selector/cmbt-trck-mod-selector.component';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { CmbtTrckGearComponent } from './../cmbt-trck-gear/cmbt-trck-gear.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { CmbtTrkCyberComponent } from './../cmbt-trk-cyber/cmbt-trk-cyber.component';
import { CmbtTrkWpnComponent } from './../cmbt-trk-wpn/cmbt-trk-wpn.component';
import { CmbtTrkWpnsComponent } from './../cmbt-trk-wpns/cmbt-trk-wpns.component';
import { CmbtTrkSkillsComponent } from './../cmbt-trk-skills/cmbt-trk-skills.component';
import { CmbtTrkSpComponent } from './../cmbt-trk-sp/cmbt-trk-sp.component';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CmbtTrckStatsComponent } from './../cmbt-trck-stats/cmbt-trck-stats.component';
import { CmbtTrckWoundLevelComponent } from './../cmbt-trck-wound-level/cmbt-trck-wound-level.component';
import { CmbtTrckWoundSectComponent } from './../cmbt-trck-wound-sect/cmbt-trck-wound-sect.component';
import { CmbtTrckStatComponent } from './../cmbt-trck-stat/cmbt-trck-stat.component';
import { CmbtTrckOpponentCardComponent } from './../cmbt-trck-opponent-card/cmbt-trck-opponent-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckFormComponent } from './cmbt-trck-form.component';

describe('CmbtTrckFormComponent', () => {
  let component: CmbtTrckFormComponent;
  let fixture: ComponentFixture<CmbtTrckFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CmbtTrckFormComponent,
        CmbtTrckOpponentCardComponent,
        CmbtTrckStatComponent,
        CmbtTrckStatsComponent,
        CmbtTrckWoundSectComponent,
        CmbtTrckWoundLevelComponent,
        CmbtTrkSpComponent,
        CmbtTrkSkillsComponent,
        CmbtTrkWpnsComponent,
        CmbtTrkWpnComponent,
        CmbtTrkCyberComponent,
        CmbtTrckGearComponent,
        CmbtTrckModSelectorComponent,
        CmbtTrckModWpnComponent,
        CmbtTrckArmorComponent

      ],
      imports: [
        CommonUiModule,
        PipesModule,
        HttpClientModule
      ],
      providers: [
        DiceService,
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
