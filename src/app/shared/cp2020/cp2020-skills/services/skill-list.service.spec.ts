import { DataSkill } from './../models';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from './../../../services/file-services';
import { TestBed } from '@angular/core/testing';

import { SkillListService } from './skill-list.service';

describe('SkillListService', () => {
  let service: SkillListService;
  let dataService: DataService;
  let testSkillList: Array<DataSkill>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi())]
});
    dataService = TestBed.inject(DataService);
    service = new SkillListService(dataService);
    testSkillList = new Array<DataSkill>();
    testSkillList.push({
      name: 'test1',
      stat: 'INT',
      ipmod: 1,
      source: { book: 'CP2020', page: 2 },
      sa: false,
      description: '',
    });
    testSkillList.push({
      name: 'test2',
      stat: 'REF',
      ipmod: 1,
      source: { book: 'CP2020', page: 6 },
      sa: true,
      description: '',
    });
    testSkillList.push({
      name: 'test3',
      stat: 'EMP',
      ipmod: 1,
      source: { book: 'CP2020', page: 3 },
      sa: false,
      description: '',
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get SkillList', () => {
    it('should get skills from file', (done) => {
      service.Skills.subscribe((skills) => {
        expect(skills).toBeTruthy();
        expect(Array.isArray(skills)).toEqual(true);
        expect(skills.length).toBeGreaterThanOrEqual(1);
        done();
      });
    });
    it('should get skills from cache', (done) => {
      service['_skillList'] = testSkillList;
      service.Skills.subscribe((skills) => {
        expect(skills).toBeTruthy();
        expect(Array.isArray(skills)).toEqual(true);
        expect(skills.length).toEqual(3);
        expect(skills[0].name).toEqual(testSkillList[0].name);
        expect(skills[2].name).toEqual(testSkillList[2].name);
        done();
      });
    });
  });

  describe('Get Special Abilities', () => {
    it('should get special abilities', (done) => {
      service.SpecialAbilities.subscribe((skills) => {
        expect(skills).toBeTruthy();
        expect(Array.isArray(skills)).toEqual(true);
        expect(skills.length).toBeGreaterThan(1);
        done();
      });
    });
    it('should get special abilities', (done) => {
      service['_skillList'] = testSkillList;
      service.SpecialAbilities.subscribe((skills) => {
        expect(skills).toBeTruthy();
        expect(Array.isArray(skills)).toEqual(true);
        expect(skills.length).toEqual(1);
        done();
      });
    });
  });

  describe('Find Skill', () => {
    it('should return null if list is not loaded', () => {
      const skill = service.findSkill(testSkillList[1].name);
      expect(skill).toEqual(null);
    });

    it('should get skill by name from cache', () => {
      service['_skillList'] = testSkillList;
      const skill = service.findSkill(testSkillList[1].name);
      expect(skill).toBeTruthy();
      expect(skill.name).toEqual(testSkillList[1].name);
    });

    it('should get skill by name from file', (done) => {
      service.SpecialAbilities.subscribe((skills) => {
        expect(skills).toBeTruthy();
        const skill = service.findSkill('HandGun');
        expect(skill).toBeTruthy();
        expect(skill.name).toEqual('Handgun');
        done();
      });
    });
  });

  describe('Find List of Skills', () => {
    let findArray: Array<any>;
    beforeEach(() => {
      findArray = ['test1', 'test3', ['Handgun']];
    });

    it('should return empty array if list is not loaded', () => {
      const skills = service.findDataSkillList(findArray);
      expect(Array.isArray(skills)).toEqual(true);
      expect(skills.length).toEqual(0);
    });

    it('should get skill by name from cache', () => {
      service['_skillList'] = testSkillList;
      const skills = service.findDataSkillList(findArray);
      expect(Array.isArray(skills)).toEqual(true);
      expect(skills.length).toEqual(2);
      expect(skills[1].name).toEqual(findArray[1]);
    });

    it('should get skill by name from file', (done) => {
      service.SpecialAbilities.subscribe((skills) => {
        expect(skills).toBeTruthy();
        const list = service.findDataSkillList(findArray);
        expect(Array.isArray(list)).toEqual(true);
        expect(list.length).toEqual(1);
        expect(list[0].name).toEqual('Handgun');
        done();
      });
    });
  });

  describe('Get CP2020 Skill List', () => {
    let findArray: Array<any>;
    beforeEach(() => {
      findArray = ['test1', 'test3', ['Handgun']];
    });

    it('should return empty array if list is not loaded', () => {
      const skills = service.getCP2020SkillList(findArray);
      expect(Array.isArray(skills)).toEqual(true);
      expect(skills.length).toEqual(0);
    });

    it('should get skill by name from cache', () => {
      service['_skillList'] = testSkillList;
      const skills = service.getCP2020SkillList(findArray);
      expect(Array.isArray(skills)).toEqual(true);
      expect(skills.length).toEqual(2);
      expect(skills[1].name).toEqual(findArray[1]);
    });

    it('should get skill by name from file', (done) => {
      service.SpecialAbilities.subscribe((skills) => {
        expect(skills).toBeTruthy();
        const list = service.getCP2020SkillList(findArray);
        expect(Array.isArray(list)).toEqual(true);
        expect(list.length).toEqual(1);
        expect(list[0].name).toEqual('Handgun');
        done();
      });
    });
  });
});
