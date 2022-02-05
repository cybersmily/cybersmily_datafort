import { DataSkill } from './data-skill';
import { Cp2020PlayerSkills } from './cp2020-player-skills';

describe('Cp2020PlayerSkills', () => {
  let dataSkillList: Array<DataSkill>;
  let playerSkills: Cp2020PlayerSkills;

  beforeEach(() => {
    dataSkillList = new Array<DataSkill>();
    dataSkillList.push({ name: 'test1', stat: 'INT', ipmod: 1, source: 'CP2020', page: 1, sa: true, description: 'test skill' });
    dataSkillList.push({ name: 'test2', stat: 'INT', ipmod: 1, source: 'CP2020', page: 1, sa: false, description: 'test skill' });
    dataSkillList.push({ name: 'test3', stat: 'BODY', ipmod: 1, source: 'CP2020', page: 1, sa: false, description: 'test skill' });
    dataSkillList.push({ name: 'test4', stat: 'ATTR', ipmod: 1, source: 'CP2020', page: 1, sa: false, description: 'test skill' });
    dataSkillList.push({ name: 'Melee', stat: 'REF', ipmod: 1, source: 'CP2020', page: 1, sa: false, description: 'test skill' });
    dataSkillList.push({ name: 'Pistol', stat: 'REF', ipmod: 1, source: 'CP2020', page: 1, sa: false, description: 'test skill' });
    dataSkillList.push({ name: 'test6', stat: 'TECH', ipmod: 1, source: 'CP2020', page: 1, sa: false, description: 'test skill' });
    dataSkillList.push({ name: 'test7', stat: 'EMP', ipmod: 1, source: 'CP2020', page: 1, sa: false, description: 'test skill' });
    dataSkillList.push({ name: 'test8', stat: 'COOL', ipmod: 1, source: 'CP2020', page: 1, sa: false, description: 'test skill' });
    dataSkillList.push({ name: 'test9', stat: 'COOL', ipmod: 1, source: 'CP2020', page: 1, sa: false, description: 'test skill' });
    dataSkillList.push({ name: 'test1', stat: 'INT', ipmod: 1, source: 'CP2020', page: 1, sa: true, description: 'test skill' });

    playerSkills = new Cp2020PlayerSkills(dataSkillList);
    for( let i = 0; i < playerSkills.skills.length; i++) {
      playerSkills.skills[i].value = i;
      playerSkills.skills[i].ip = i * 10;
      playerSkills.skills[i].isRoleSkill = i%10 === 3;
      playerSkills.skills[i].chipped = i%10 === 4;
    }
  });

  afterEach(()=> {
    dataSkillList = undefined;
  })

  describe('constructor and loading', () => {
    it('should create', () => {
      const skills = new Cp2020PlayerSkills();
      expect(skills).toBeTruthy();
    });

    it('should create from parameter', () => {
      const skills = new Cp2020PlayerSkills(dataSkillList);
      expect(skills).toBeTruthy();
      expect(skills.skills.length).toEqual(dataSkillList.length);
    });

    it('should create from parameter with others', () => {
      const skills = new Cp2020PlayerSkills(dataSkillList, true);
      expect(skills).toBeTruthy();
      expect(skills.skills.length).toEqual(dataSkillList.length + 7);
    });
  });

  describe('properties', () => {
    it('should return all skills with values', () => {
      expect(playerSkills.SkillsWithValues.length).toEqual(dataSkillList.length - 1);
    });

    it('should return special ability skills', () => {
      expect(playerSkills.specialAbilites.length).toEqual(2);
    });

    it('should return ATTR skills', () => {
      expect(playerSkills.ATTR.length).toEqual(1);
    });

    it('should return REF skills', () => {
      expect(playerSkills.REF.length).toEqual(2);
    });

    it('should return COOL skills', () => {
      expect(playerSkills.COOL.length).toEqual(2);
    });

    it('should return INT skills', () => {
      expect(playerSkills.INT.length).toEqual(1);
    });

    it('should return BODY skills', () => {
      expect(playerSkills.BODY.length).toEqual(1);
    });

    it('should return EMP skills', () => {
      expect(playerSkills.EMP.length).toEqual(1);
    });

    it('should return TECH skills', () => {
      expect(playerSkills.TECH.length).toEqual(1);
    });

    it('should return Other skills', () => {
      expect(playerSkills.Other.length).toEqual(0);
    });

    it('should return Role skills', () => {
      expect(playerSkills.RoleSKills.length).toEqual(1);
    });

    it('should return Role skills Total Value', () => {
      expect(playerSkills.RoleSKillTotal).toEqual(3);
    });

    it('should return chipped skills', () => {
      expect(playerSkills.ChippedSkills.length).toEqual(1);
    });

    it('should return Non-Role skills', () => {
      expect(playerSkills.NonRoleSkills.length).toEqual(9);
    });

    it('should return total of Non-Role skills', () => {
      expect(playerSkills.NonRoleSKillTotal).toEqual(48);
    });
  });

  describe('importSkills()', () => {
    it('should import from other array', () => {
      const newSkills = new Cp2020PlayerSkills();
      newSkills.importSkills(playerSkills.skills);
      expect(newSkills).toBeTruthy();
      // it will remove the duplicate
      expect(newSkills.skills.length).toEqual(playerSkills.skills.length - 1);
      expect(newSkills.skills[3].name).toEqual(playerSkills.skills[3].name);
      expect(newSkills.skills[3].value).toEqual(playerSkills.skills[3].value);
    });
  });

  describe('getSkillForWeaponType()', () => {
    it('should find pistol skill', () => {
      expect(playerSkills.getSkillForWeaponType('p').length).toEqual(1);
    });
    it('should find pistol skill', () => {
      expect(playerSkills.getSkillForWeaponType('p').length).toEqual(1);
    });
    it('should find melee skill', () => {
      // should find 2, the Melee skill and Not Trained
      expect(playerSkills.getSkillForWeaponType('mel').length).toEqual(2);
    });
    it('should not find smg skill', () => {
      const list = playerSkills.getSkillForWeaponType('smg');
      expect(list.length).toEqual(1);
      expect(list[0].name).toEqual('Not trained');
    });
    it('should not find rifle skill', () => {
      const list = playerSkills.getSkillForWeaponType('rif');
      expect(list.length).toEqual(1);
      expect(list[0].name).toEqual('Not trained');
    });
    it('should not find shotgun skill', () => {
      const list = playerSkills.getSkillForWeaponType('sht');
      expect(list.length).toEqual(1);
      expect(list[0].name).toEqual('Not trained');
    });
    it('should not find Heavy Weapon skill', () => {
      const list = playerSkills.getSkillForWeaponType('hvy');
      expect(list.length).toEqual(1);
      expect(list[0].name).toEqual('Not trained');
    });
    it('should find other combat skills', () => {
      const list = playerSkills.getSkillForWeaponType('ma');
      expect(list.length).toEqual(2);
    });
    it('should not find if type is undefined', () => {
      expect(playerSkills.getSkillForWeaponType(undefined).length).toEqual(0);
    });
  });

  describe('getPhysicalCombatSkills()', () => {
    it('should get all physical combat skills', () => {
      expect(playerSkills.getPhysicalCombatSkills().length).toEqual(1);
    });
  });
  describe('getCombatSkills()', () => {
    it('should get all combat skills', () => {
      expect(playerSkills.getCombatSkills().length).toEqual(2);
    });
  });
  describe('setRoleSkills()', () => {
    it('should set skills to role ones', () => {
    });
  });
});
