import { CPRedLifePathSettings } from './../../shared/cpred/c-p-red-lifepath/models/c-p-red-life-path-settings';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedLifepathMainComponent } from './cp-red-lifepath-main.component';

describe('CpRedLifepathMainComponent', () => {
  let component: CpRedLifepathMainComponent;
  let fixture: ComponentFixture<CpRedLifepathMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedLifepathMainComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        DiceService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedLifepathMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changeSystem()', () => {
    it('should clear roleParam', () => {
      component.roleParam = {name: 'test'};
      expect(component.roleParam.name).toEqual('test');
      component.changeSystem();
      expect(component.roleParam).toBeUndefined();
    });
  });

  describe('settings', () => {
    let settings: CPRedLifePathSettings;

    beforeEach(() => {
      settings = new CPRedLifePathSettings();
      settings.enemyDice = '1d3';
      settings.friendsDice = '1d6 - 3';
      settings.loversDice = '1d4 -1';
    });

    afterAll(()=> {
      window.localStorage.clear();
    });

    it('should store settings to localStorage', () => {
      component.storeSettings(settings);
      expect(window.localStorage.getItem(component.settingsKey).indexOf(settings.enemyDice)).toBeGreaterThanOrEqual(0);
    });

    it('should load settings from localStorage', () => {
      component.storeSettings(settings);
      const storedSettings = component.loadSettings();
      expect(storedSettings.enemyDice).toEqual(settings.enemyDice);
    });
  });
});
