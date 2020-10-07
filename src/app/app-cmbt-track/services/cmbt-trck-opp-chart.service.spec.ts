import { of } from 'rxjs';
import { CmbtTrckCharts } from './../../shared/models/cmbt-trck/cmbt-trck-charts';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/data.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { TestBed } from '@angular/core/testing';

import { CmbtTrckOppChartService } from './cmbt-trck-opp-chart.service';
import { CpPlayerWeapon } from './../../shared/models/weapon';

describe('CmbtTrckOppChartService', () => {
  let service: CmbtTrckOppChartService;
  let diceService: DiceService;
  let dataService: DataService;
  let testData: CmbtTrckCharts;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        DiceService,
        DataService
      ]
    });
    diceService = new DiceService();
    dataService = TestBed.inject(DataService);
    service = new CmbtTrckOppChartService(dataService, diceService);
    testData = {
      weapon: {
        chart: [0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4],
        values: [
          {
            name: 'Melee', choices: [
              { name: 'club', type: 'MEL', wa: 0, con: 'L', damage: '1D6' },
              { name: 'switchblade', type: 'MEL', wa: 0, con: 'P', damage: '1D6/2' },
              { name: 'machete', type: 'MEL', wa: 0, con: 'L', damage: '1D6+3' }
            ]
          },
          {
            name: 'Med. Pistol', choices: [
              { name: 'Militech Arms Avenger', type: 'P', wa: 0, con: 'J', damage: '2D6+1', shots: 10, rof: 2, rel: 'VR', rng: 50 },
              { name: 'Dai Lung Streetmaster', type: 'P', wa: 0, con: 'J', damage: '2D6+3', shots: 12, rof: 2, rel: 'UR', rng: 50 },
              { name: 'Federated Arms X-9mm', type: 'P', wa: 0, con: 'J', damage: '2D6+1', shots: 12, rof: 2, rel: 'ST', rng: 50 }
            ]
          },
          {
            name: 'Medium SMG', choices: [
              { name: 'Arasaka Minami 10', type: 'SMG', wa: 0, con: 'J', damage: '2D6+3', shots: 40, rof: 20, rel: 'VR', rng: 200 },
              { name: 'H\\&K MPK-9', type: 'SMG', wa: 1, con: 'J', damage: '2D6+1', shots: 35, rof: 25, rel: 'ST', rng: 200 }
            ]
          },
          {
            name: 'Shotgun', choices: [
              { name: 'Arasaka Rapid Assault 12', type: 'RIF', wa: -1, con: 'N', damage: '4D6', shots: 20, rof: 10, rel: 'ST', rng: 50 },
              { name: 'Sternmeyer Stakeout 10', type: 'RIF', wa: -2, con: 'N', damage: '4D6', shots: 10, rof: 2, rel: 'ST', rng: 50 }
            ]
          },
          {
            name: 'Assault Rifle', choices: [
              { name: 'Militech Ronin', type: 'RIF', wa: 1, con: 'N', damage: '5D6', shots: 35, rof: 30, rel: 'VR', rng: 400 },
              { name: 'AKR-20', type: 'RIF', wa: 0, con: 'N', damage: '5D6', shots: 30, rof: 30, rel: 'ST', rng: 400 },
              { name: 'FN-RAL', type: 'RIF', wa: -1, con: 'N', damage: '6D6+2', shots: 30, rof: 30, rel: 'VR', rng: 400 }
            ]
          }
        ]
      },
      armor: {
        chart: [0, 1, 2, 2],
        values: [
          { name: 'Light Armor Jacket', armor: { head: 0, torso: 14, arms: 14, legs: 0, ev: 0 } },
          { name: 'Med. Armor Jacket', armor: { head: 0, torso: 18, arms: 18, legs: 0, ev: 1 } },
          { name: 'MetalGear', armor: { head: 25, torso: 25, arms: 25, legs: 25, ev: 2, isHard: true } }
        ]
      },
      cyberware: {
        chart: [0, 0, 0, 1, 1, 1, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 7, 7, 8, 8, 8],
        values: [
          { name: 'Cyberoptics', optLimit: 4, options: ['IR', 'Lowlight', 'Camera', 'Dartgun', 'Antidazzle', 'Targeting Scope'] },
          { name: 'Cyberarm', optLimit: 3,
            options: ['Hydraulic Rams', 'Thickened Myomer', 'Reinforced Joints', 'EMP Shielding', 'Armored', 'Armored']
          },
          { name: 'Rippers', weapon: { name: 'Rippers', type: 'MEL', wa: 0, damage: '1D6+3' } },
          { name: 'Wolvers', weapon: { name: 'Wolvers', type: 'MEL', wa: 0, damage: '3D6' } },
          { name: 'Skinweave', armor: { head: 12, torso: 12, arms: 12, legs: 12 } },
          { name: 'Subdermal armor', armor: { head: 0, torso: 18, arms: 0, legs: 0 } },
          { name: 'Reflex Boost Sandevistan', notes: 'Sandevistan +3 init. 5 turns' },
          { name: 'Muscle and Bone Lace', notes: '+2 BODY' },
          { name: 'Nerualware', optLimit: 6,
            otions: ['smartgun', 'smartgun', 'smartgun', 'tactile boost', 'skill chip', 'skill chip', 'skill chip', 'Vehicle Link']
          }
        ]
      }
    };
    spyOn(dataService, 'GetJson').and.returnValue(of(testData));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getData', () => {
    it('should get data', (done) => {
      service.getData().subscribe( data => {
        expect(data).toBeTruthy();
        expect(data.cyberware).toBeTruthy();
        expect(data.armor).toBeTruthy();
        expect(data.weapon).toBeTruthy();
        done();
      });
    });
  });

  describe('generateWeapon', () => {
    it('should generate weapons from cache', (done) => {
      service['_curCharts'] = testData;
      service.generateWeapon(3).subscribe(data => {
        expect(data.length).toEqual(3);
        done();
      });
    });

    it('should generate weapons from dataService', (done) => {
      service.generateWeapon(3).subscribe(data => {
        expect(data.length).toEqual(3);
        done();
      });
    });
  });

  describe('getWeapon', () => {
    it('should get weapons from cache', () => {
      service['_curCharts'] = testData;
      const weapons: Array<CpPlayerWeapon> = service.getWeapon(5);
      expect(weapons.length).toEqual(5);
      expect(weapons[0].name).not.toBeUndefined();
      expect(weapons[0].name).not.toEqual('');
      expect(weapons[4].name).not.toBeUndefined();
      expect(weapons[4].name).not.toEqual('');
    });

  });
  describe('generateArmor', () => {
    it('should generate armor from cache', (done) => {
      service['_curCharts'] = testData;
      service.generateArmor().subscribe(data => {
        expect(data).toBeTruthy();
        expect(data.name).toBeTruthy();
        expect(data.armor).toBeTruthy();
        done();
      });
    });

    it('should generate armor from dataService', (done) => {
      service.generateArmor().subscribe(data => {
        expect(data).toBeTruthy();
        expect(data.name).toBeTruthy();
        expect(data.armor).toBeTruthy();
        done();
      });
    });

    it('should generate armor die roll', (done) => {
      service['_curCharts'] = testData;
      spyOn(diceService, 'generateNumber').and.returnValue(1);
      service.generateArmor().subscribe(data => {
        expect(data).toBeTruthy();
        expect(data.name).toEqual(testData.armor.values[1].name);
        expect(data.armor).toBeTruthy();
        done();
      });
    });

  });

  describe('generateCyberware', () => {
    it('should generate cyberware from cache', (done) => {
      service['_curCharts'] = testData;
      service.generateCyberware(4).subscribe(data => {
        expect(data).toBeTruthy();
        expect(data.length).toEqual(4);
        expect(data[0]).toBeTruthy();
        expect(data[0].name).not.toBeUndefined();
        expect(data[0].name).not.toEqual('');
        expect(data[3].name).not.toBeUndefined();
        expect(data[3].name).not.toEqual('');
        done();
      });
    });

    it('should generate cyberware from dataService', (done) => {
      service.generateCyberware(4).subscribe(data => {
        expect(data).toBeTruthy();
        expect(data.length).toEqual(4);
        expect(data[0]).toBeTruthy();
        expect(data[0].name).not.toBeUndefined();
        expect(data[0].name).not.toEqual('');
        expect(data[3].name).not.toBeUndefined();
        expect(data[3].name).not.toEqual('');
        done();
      });
    });

    it('should generate cyberware die roll', (done) => {
      service['_curCharts'] = testData;
      spyOn(diceService, 'generateNumber').and.returnValue(1);
      service.generateCyberware(1).subscribe(data => {
        expect(data).toBeTruthy();
        expect(data[0].name).toEqual(testData.cyberware.values[0].name);
        expect(data[0].options).toBeTruthy();
        expect(data[0].options).toContain(testData.cyberware.values[0].options[1]);
        done();
      });
    });
   });
});
