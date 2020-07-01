import { SeoService } from './../../shared/services/seo/seo.service';
import { HttpClientModule } from '@angular/common/http';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { TempGeneratorWeaponsComponent } from './../temp-generator-weapons/temp-generator-weapons.component';
import { TempGeneratorStatsComponent } from './../temp-generator-stats/temp-generator-stats.component';
import { TempGeneratorSkillsComponent } from './../temp-generator-skills/temp-generator-skills.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempGeneratorComponent } from './temp-generator.component';
import { TempGeneratorArmorComponent } from '../temp-generator-armor/temp-generator-armor.component';
import { TempGeneratorGearComponent } from '../temp-generator-gear/temp-generator-gear.component';
import { TempGeneratorLifepathComponent } from '../temp-generator-lifepath/temp-generator-lifepath.component';

describe('TempGeneratorComponent', () => {
  let component: TempGeneratorComponent;
  let fixture: ComponentFixture<TempGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TempGeneratorComponent,
        TempGeneratorSkillsComponent,
        TempGeneratorStatsComponent,
        TempGeneratorLifepathComponent,
        TempGeneratorWeaponsComponent,
        TempGeneratorArmorComponent,
        TempGeneratorGearComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule
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
    fixture = TestBed.createComponent(TempGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
