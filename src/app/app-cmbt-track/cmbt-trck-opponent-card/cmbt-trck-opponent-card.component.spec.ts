import { WeaponModule } from './../../shared/modules/weapons/weapon.module';
import { CmbtTrckArmorComponent } from './../cmbt-trck-armor/cmbt-trck-armor.component';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { CmbtTrckGearComponent } from './../cmbt-trck-gear/cmbt-trck-gear.component';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { CmbtTrkCyberComponent } from './../cmbt-trk-cyber/cmbt-trk-cyber.component';
import { CmbtTrkSkillsComponent } from './../cmbt-trk-skills/cmbt-trk-skills.component';
import { CmbtTrkSpComponent } from './../cmbt-trk-sp/cmbt-trk-sp.component';
import { DataService } from './../../shared/services/data.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CmbtTrckStatComponent } from './../cmbt-trck-stat/cmbt-trck-stat.component';
import { CmbtTrckWoundSectComponent } from './../cmbt-trck-wound-sect/cmbt-trck-wound-sect.component';
import { CmbtTrckWoundLevelComponent } from './../cmbt-trck-wound-level/cmbt-trck-wound-level.component';
import { CmbtTrckStatsComponent } from './../cmbt-trck-stats/cmbt-trck-stats.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckOpponentCardComponent } from './cmbt-trck-opponent-card.component';

describe('CmbtTrckOpponentCardComponent', () => {
  let component: CmbtTrckOpponentCardComponent;
  let fixture: ComponentFixture<CmbtTrckOpponentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CmbtTrckOpponentCardComponent,
        CmbtTrckStatsComponent,
        CmbtTrckStatComponent,
        CmbtTrckWoundLevelComponent,
        CmbtTrckWoundSectComponent,
        CmbtTrkSpComponent,
        CmbtTrkSkillsComponent,
        CmbtTrkCyberComponent,
        CmbtTrckGearComponent,
        CmbtTrckArmorComponent
      ],
      imports: [
        CommonUiModule,
        PipesModule,
        HttpClientModule,
        WeaponModule
      ],
      providers: [
        DiceService,
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckOpponentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
