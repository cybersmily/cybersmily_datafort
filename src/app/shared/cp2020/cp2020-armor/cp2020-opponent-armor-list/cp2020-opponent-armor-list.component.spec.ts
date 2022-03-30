import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { ArmorGeneratorService } from './../services/armor-generator/armor-generator.service';
import { ArmorDataAttributesService } from './../services/armor-data-attributes/armor-data-attributes.service';
import { ArmorRandomGenSettingsService } from './../services/armor-random-gen-settings/armor-random-gen-settings.service';
import { DiceService } from './../../../services/dice/dice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020OpponentArmorListComponent } from './cp2020-opponent-armor-list.component';

describe('Cp2020OpponenentListComponent', () => {
  let component: Cp2020OpponentArmorListComponent;
  let fixture: ComponentFixture<Cp2020OpponentArmorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020OpponentArmorListComponent ],
      imports: [
        CommonUiModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        DiceService,
        ArmorRandomGenSettingsService,
        ArmorDataAttributesService,
        ArmorGeneratorService,
        DataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020OpponentArmorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
