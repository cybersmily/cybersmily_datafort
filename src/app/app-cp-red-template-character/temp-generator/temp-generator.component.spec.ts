import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { SeoService } from './../../shared/services/seo/seo.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services';
import { TempGeneratorWeaponsComponent } from './../temp-generator-weapons/temp-generator-weapons.component';
import { TempGeneratorStatsComponent } from './../temp-generator-stats/temp-generator-stats.component';
import { TempGeneratorSkillsComponent } from './../temp-generator-skills/temp-generator-skills.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TempGeneratorComponent } from './temp-generator.component';
import { TempGeneratorArmorComponent } from '../temp-generator-armor/temp-generator-armor.component';
import { TempGeneratorGearComponent } from '../temp-generator-gear/temp-generator-gear.component';
import { TempGeneratorLifepathComponent } from '../temp-generator-lifepath/temp-generator-lifepath.component';

describe('TempGeneratorComponent', () => {
  let component: TempGeneratorComponent;
  let fixture: ComponentFixture<TempGeneratorComponent>;

  beforeEach(waitForAsync(() => {
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
    imports: [CommonUiModule],
    providers: [
        DataService,
        DiceService,
        SeoService,
        provideHttpClient(withInterceptorsFromDi())
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
