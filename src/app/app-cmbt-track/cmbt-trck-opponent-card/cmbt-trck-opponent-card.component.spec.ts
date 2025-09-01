import {
  faDice,
  faThumbtack,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Cp2020StatBlock } from './../../shared/cp2020/cp2020-stats/models/cp2020-stat-block';
import {
  Cp2020ArmorPiece,
  Cp2020ArmorBlock,
} from './../../shared/cp2020/cp2020-armor/models';
import { CpPlayerWeaponList } from './../../shared/cp2020/cp2020weapons/models/cp-player-weapon-list';
import { CpPlayerWeapon } from './../../shared/cp2020/cp2020weapons/models/cp-player-weapon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Cp2020StatsModule } from './../../shared/cp2020/cp2020-stats/cp2020-stats.module';
import { Cp2020WoundsModule } from './../../shared/cp2020/cp2020wounds/cp2020wounds.module';
import { Cp2020weaponsModule } from './../../shared/cp2020/cp2020weapons/cp2020weapons.module';
import { Cp2020ArmorModule } from './../../shared/cp2020/cp2020-armor/cp2020-armor.module';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { CmbtTrckGearComponent } from './../cmbt-trck-gear/cmbt-trck-gear.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { CmbtTrkCyberComponent } from './../cmbt-trk-cyber/cmbt-trk-cyber.component';
import { DataService } from './../../shared/services/file-services';
import { DiceService } from './../../shared/services/dice/dice.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CmbtTrckOpponentCardComponent } from './cmbt-trck-opponent-card.component';
import { CmbtTrckOpponent } from './../../shared/models/cmbt-trck';
import { OppCyberware } from './../../shared/cp2020/cp2020-cyberware/models';
import { Cp2020Role } from './../../shared/cp2020/cp2020-role/models';
import { Cp2020PlayerSkill } from './../../shared/cp2020/cp2020-skills/models';

describe('CmbtTrckOpponentCardComponent', () => {
  let component: CmbtTrckOpponentCardComponent;
  let fixture: ComponentFixture<CmbtTrckOpponentCardComponent>;

  let roles: Array<Cp2020Role> = [
    {
      name: 'Solo',
      base: '',
      specialability: {
        name: 'combat sense',
        stat: 'REF',
        description: '',
        ipmod: 1,
      },
      skills: [
        { name: 'Awareness', stat: 'INT', description: '', ipmod: 1 },
        { name: 'Handgun', stat: 'REF', description: '', ipmod: 1 },
        { name: 'Stealth', stat: 'REF', description: '', ipmod: 1 },
        { name: 'Martial Arts', stat: 'REF', description: '', ipmod: 1 },
      ],
      source: { book: '', page: 0 },
      salary: [1000, 2000, 3000, 4000, 5000, 6000],
    },
    {
      name: 'Fixer',
      base: '',
      specialability: {
        name: 'Streetdeal',
        stat: 'COOL',
        description: '',
        ipmod: 1,
      },
      skills: [
        'Awareness',
        'Handgun',
        'Intimidate',
        'Pick Lock',
        `Fast Talk \\\& Persuasion`,
      ],
      source: { book: '', page: 0 },
      salary: [1000, 2000, 3000, 4000, 5000, 6000],
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        CmbtTrckOpponentCardComponent,
        CmbtTrkCyberComponent,
        CmbtTrckGearComponent,
    ],
    imports: [CommonUiModule,
        BrowserAnimationsModule,
        PipesModule,
        Cp2020weaponsModule,
        Cp2020WoundsModule,
        Cp2020StatsModule,
        Cp2020ArmorModule],
    providers: [DiceService, DataService, provideHttpClient(withInterceptorsFromDi())]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckOpponentCardComponent);
    component = fixture.componentInstance;
    const opp = new CmbtTrckOpponent();
    opp.name = 'Test Opponent';
    opp.role = roles[0].name;
    opp.sa = [new Cp2020PlayerSkill(roles[0].specialability)];
    opp.skills = roles[0].skills;
    component.opponent = opp;
    component.index = 0;
    fixture.detectChanges();
    component.roles = roles;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.opponent.name).toEqual(component.currOpponent.name);
    expect(component.dice).toEqual(faDice);
    expect(component.faTrash).toEqual(faTrash);
    expect(component.index).toEqual(0);
    expect(component.customClass).not.toEqual('');
    expect(component.currOpponent).toBeTruthy();
    expect(component.selectedTemplate).toBeNull();
    expect(component.selectedRole).toBeNull();
    expect(component.roles.length).toEqual(2);
    expect(component.skills.length).toEqual(0);
  });

  it('should ngChange', () => {
    component.currOpponent = new CmbtTrckOpponent();
    component.selectedRole = roles[0];
    component.selectedTemplate = {};
    expect(component.currOpponent.name).toEqual('');
    component.ngOnChanges();
    fixture.autoDetectChanges();
    expect(component.currOpponent.name).toEqual('Test Opponent');
    expect(component.selectedRole).toBeNull();
    expect(component.selectedTemplate).toBeNull();
  });

  it('should ngInit', () => {
    expect(component.currOpponent.name).toEqual('Test Opponent');
    component.opponent.name = 'testing';
    component.ngOnInit();
    fixture.autoDetectChanges();
    expect(component.currOpponent.name).toEqual('testing');
  });

  describe('clear()', () => {
    it('should clear opponents', () => {
      expect(component.opponent.name).toEqual('Test Opponent');
      expect(component.currOpponent.name).toEqual('Test Opponent');
      component.clear();
      fixture.detectChanges();
      expect(component.opponent.name).toEqual('');
      expect(component.currOpponent.name).toEqual('');
    });
  });

  describe('changeOpponent()', () => {
    it('should chnage opponent', () => {
      expect(component.currOpponent.name).toEqual('Test Opponent');
      component.changeOpponent();
      expect(component.currOpponent.name).toEqual('Test Opponent');
      const opp = new CmbtTrckOpponent();
      opp.name = 'New Opponent';
      opp.role = roles[0].name;
      opp.sa = [new Cp2020PlayerSkill(roles[0].specialability)];
      opp.skills = roles[0].skills;
      component.changeOpponent(opp);
      fixture.autoDetectChanges();
      expect(component.currOpponent.name).toEqual('New Opponent');
    });
  });

  describe('changeWeapons()', () => {
    it('should change weapons to empty', () => {
      expect(component.currOpponent.weapons.length).toEqual(0);
      expect(component.opponent.weapons.length).toEqual(0);
      component.changeWeapons(undefined);
      fixture.detectChanges();
      expect(component.currOpponent.weapons.length).toEqual(0);
      expect(component.opponent.weapons.length).toEqual(0);
    });

    it('should change weapons', () => {
      const wpn = new CpPlayerWeapon();
      wpn.name = 'test weapon';
      const wpnLst = new CpPlayerWeaponList();
      wpnLst.addWeapon(wpn);
      component.changeWeapons(wpnLst);
      fixture.detectChanges();
      expect(component.currOpponent.weapons).toBeTruthy();
      expect(component.currOpponent.weapons.length).toEqual(1);
      expect(component.currOpponent.weapons[0].name).toEqual('test weapon');
    });
  });

  describe('changeGear()', () => {
    it('should change gear', () => {
      expect(component.currOpponent.gear.length).toEqual(0);
      const gearArray = ['test1', 'test2'];
      component.changeGear(gearArray);
      fixture.detectChanges();
      expect(component.currOpponent.gear.length).toEqual(2);
      expect(component.currOpponent.gear[0]).toEqual(gearArray[0]);
    });
  });

  describe('changeCyber()', () => {
    it('should change cyber', () => {
      expect(component.currOpponent.cyberware.length).toEqual(0);
      const cyber: Array<OppCyberware> = [
        {
          name: 'test1',
          abbrev: 't1',
          cost: 0,
          notes: '',
          hc: '1d6',
          surgery: 'M',
        },
        {
          name: 'test2',
          abbrev: 't2',
          cost: 0,
          notes: '',
          hc: '1d6',
          surgery: 'M',
        },
      ];
      component.changeCyber(cyber);
      fixture.detectChanges();
      expect(component.currOpponent.cyberware.length).toEqual(2);
      expect(component.currOpponent.cyberware[0].name).toEqual(cyber[0].name);
    });

    it('should change cyber with armor', () => {
      expect(component.currOpponent.cyberware.length).toEqual(0);
      const cyber: Array<OppCyberware> = [
        {
          name: 'skinweave',
          abbrev: 'skw',
          cost: 0,
          notes: '',
          armor: {},
          hc: '1d6',
          surgery: 'M',
        },
      ];
      component.changeCyber(cyber);
      fixture.detectChanges();
      expect(component.currOpponent.armor.activePieces.length).toEqual(1);
    });
  });

  describe('changeRole()', () => {
    it('should change role', () => {
      component.selectedRole = roles[0];
      component.changeRole();
      fixture.detectChanges();
      component.selectedRole = roles[1];
      component.changeRole();
      fixture.detectChanges();
    });
  });

  describe('deleteRole()', () => {
    it('should delete role', () => {
      expect(component.currOpponent.role).toEqual('Solo');
      component.deleteRole();
      fixture.autoDetectChanges();
      expect(component.currOpponent.role).toEqual('');
    });
  });

  describe('changeArmor()', () => {
    it('should change armor', () => {
      expect(component.currOpponent.armor.activePieces.length).toEqual(0);
      const armor = new Cp2020ArmorBlock();
      const layer = new Cp2020ArmorPiece();
      layer.name = 'test layer';
      layer.locations['torso'] = 12;
      layer.isActive = true;
      layer.ev = 1;
      armor.addPiece(layer);
      component.changeArmor(armor);
      fixture.autoDetectChanges();
      expect(component.currOpponent.armor.activePieces.length).toEqual(1);
      expect(component.currOpponent.stats.REF.ev).toEqual(1);
    });
  });

  describe('changeTemplate()', () => {
    it('should change template', () => {});
  });

  describe('onStatBlockChange()', () => {
    it('should change stat block', () => {
      expect(component.currOpponent.stats.REF.Adjusted).toEqual(0);
      const stats = new Cp2020StatBlock();
      stats.REF.Base = 10;
      component.onStatBlockChange(stats);
      fixture.autoDetectChanges();
      expect(component.currOpponent.stats.REF.Adjusted).toEqual(10);
    });
  });
});
