import { CpRedLifepathCoreData } from './../models/cp-red-lifepath-core-data';
import { CPRedLifepathJumpStartData } from './../models/cp-red-lifepath-js-data';
import { DiceService } from './../../../services/dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CPRedLifePathService } from './c-p-red-life-path.service';

describe('CPRedLifePathService', () => {
  let service: CPRedLifePathService;
  let diceService: DiceService;
  let coreCharts:CpRedLifepathCoreData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DiceService
      ]
    });
    diceService = TestBed.inject(DiceService);
    service = new CPRedLifePathService(diceService);
    coreCharts = {
      culture: [{name: 'North American',languages: ['English']}],
      personality: ['Shy and secretive'],
      clothing: ['Generic Chic'],
      hairstyle: ['Mohawk'],
      affectation: ['Tattoos'],
      valueMost: ['Money'],
      feelAboutPeople: ['I stay neutral'],
      valuedPerson: ['A parent'],
      valuedPossesion: ['A weapon'],
      originalBackground: ['Corporate Execs'],
      childhoodEnvironment: ['Ran on The Street, with no adult supervision.'],
      familyCrisis: ['Your family lost everything through betrayal.'],
      goals: ['Get rid of a bad reputation.'],
      friends: ['Like an older sibling to you'],
      enemies: ['Ex-friend'],
      enemyReason: ['Caused the other to lose face or status.'],
      enemyResources: ['Just themselves and even they won\'t go out of their way.'],
      enemyReaction: ['Avoid the scum.'],
      romance: ['Your lover died in an accident.'],
      roles: [
        {
          role: 'Solo',
          charts: [
            '[type]',
            '[morals]',
            '{pack}',
            "(partner)[partner]",
            '[territory]',
            '[enemies]'
          ],
          type: {
            name: 'Type',
            chart: ['Bodyguard']
          },
          param: [
            {
              name: 'pack',
              display: 'Pack based?',
              options: [
                'option'
              ]
            },
            {
              name: 'partner',
              display: 'Work with a Partner?'
            }
          ]
        }
      ]
    };
    coreCharts.roles[0]['morals'] = {
      name: 'Your moral compass',
      chart: ['Always working for good, trying to take out the \'bad guys.\'',]
    };
    coreCharts.roles[0]['territory'] = {
      name: 'Operational territory',
      chart: ['A Corporate Zone']
    };
    coreCharts.roles[0]['enemies'] = {
      name: 'Who\'s gunning for you?',
      chart: ['A Corporation you may have angered.']
    };
    coreCharts.roles[0]['option'] = {
      name: 'Your moral compass',
      chart: ['Always working for good, trying to take out the \'bad guys.\'',]
    };
    coreCharts.roles[0]['partner'] = {
      name: 'Your moral compass',
      chart: ['Always working for good, trying to take out the \'bad guys.\'',]
    };

  });

  describe('Create', ()=> {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('resetSettings()', ()=> {
    it('should be reset', () => {
      const original = service.settings.enemyDice;
      service.settings.enemyDice = '1d10';
      service.settings.friendsDice = '1d10';
      expect(service.settings.enemyDice).toEqual('1d10');
      service.resetSettings()
      expect(service.settings.enemyDice).toEqual(original);
    });
  });

  describe('Generate Functions', ()=> {
    it('should generate Jumpstart Lifepath', () => {
      const chart = new CPRedLifepathJumpStartData();
      const lifepath = service.generateJumpStart(chart);
      expect(lifepath).toBeTruthy();
    });


    it('should generate Core Lifepath', () => {
      let lifepath = service
      .generateCore(coreCharts, 'Solo', {pack: 'option', partner: true});
      expect(lifepath).toBeTruthy();
      lifepath = service
      .generateCore(coreCharts, 'Solo', {pack: 'option', partner: false});
      expect(lifepath).toBeTruthy();
    });
  });
});
