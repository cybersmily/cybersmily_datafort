import { DataSkill } from './data-skill';
import { SkillParameters } from './skill-parameters';
import { Cp2020PlayerSkill } from './cp2020-player-skill';

describe('Cp2020PlayerSkill', () => {
  let param: SkillParameters;
  beforeEach(() => {
    param = {
      name: 'test',
      desc: 'test skill',
      stat: 'REF',
      value: 3,
      ipmod: 1,
      ip: 0,
    };
  });

  describe('constructor()', () => {
    it('should create', () => {
      const skill = new Cp2020PlayerSkill();
      expect(skill).toBeTruthy();
    });

    it('should create with parameters', () => {
      const skill = new Cp2020PlayerSkill(param);
      expect(skill).toBeTruthy();
      expect(skill.name).toEqual(param.name);
      expect(skill.stat).toEqual(param.stat);
    });
  });

  describe('totalModifiers()', () => {
    it('should total Modifiers', () => {
      const skill = new Cp2020PlayerSkill(param);
      skill.modifiers.push({ name: 'mod1', mod: 1 });
      skill.modifiers.push({ name: 'mod2', mod: -3 });
      skill.modifiers.push({ name: 'mod3', mod: 2 });
      skill.modifiers.push({ name: 'mod4', mod: 3 });
      expect(skill.totalModifiers).toEqual(3);
    });
  });

  describe('toDataSkill()', () => {
    it('should create DataSkill from it', () => {
      const skill = new Cp2020PlayerSkill(param);
      const dataSkill = skill.toDataSkill();
      expect(dataSkill).toBeTruthy();
      expect(dataSkill.name).toEqual(param.name);
      expect(dataSkill.stat).toEqual(param.stat);
      expect(dataSkill.ipmod).toEqual(param.ipmod);
      expect(dataSkill.source.book).toEqual('');
      expect(dataSkill.source.page).toEqual(0);
      expect(dataSkill.sa).toEqual(false);
      expect(dataSkill.description).toEqual(param.desc);
      expect(dataSkill['ip']).toBeUndefined();
      expect(dataSkill['value']).toBeUndefined();
    });
  });

  describe('fromDataSkill()', () => {
    it('should create Skill from DataSkill type', () => {
      const dataSkill: DataSkill = {
        name: 'test',
        stat: 'INT',
        ipmod: 1,
        source: { book: 'CP2020', page: 1 },
        sa: true,
        description: 'test skill',
      };
      const skill = new Cp2020PlayerSkill();
      skill.fromDataSkill(dataSkill);
      expect(skill).toBeTruthy();
      expect(skill.name).toEqual(dataSkill.name);
      expect(skill.stat).toEqual(dataSkill.stat);
      expect(skill.isSA).toBeTrue();
    });
  });
});
