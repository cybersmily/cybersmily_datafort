import { Cp2020PlayerSkill } from './../cp2020character/cp2020-player-skill';
import { FumbleChart } from './fumble-chart';
import { TestBed } from '@angular/core/testing';

describe('FumbleChart', () => {
  let skill: Cp2020PlayerSkill;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    skill = new Cp2020PlayerSkill();
  });

  it('should create an instance', () => {
    expect(new FumbleChart()).toBeTruthy();
  });
  it('should return combat ref results', () => {
    skill.stat = 'REF';
    skill.name = 'Martial Arts: Karate';
    const results = FumbleChart.getResults(7, skill);
    expect(results).toBe('Weapon jam (check reliability) or imbeds itself for 1 turn.');
  });

  it('should non-combat ref results', () => {
    skill.stat = 'REF';
    skill.name = 'Athletics';
    const results = FumbleChart.getResults(7, skill);
    expect(results).toBe('Take 1 point of dmaage plus Stun Save.');
  });

  it('should emp results', () => {
    skill.stat = 'EMP';
    skill.name = 'Social';
    const results = FumbleChart.getResults(7, skill);
    expect(results).toBe('Possible violent reaction on a 4 or less on a 1D10 roll.');
  });

  it('should tech results', () => {
    skill.stat = 'TECH';
    skill.name = 'Weaponsmith';
    const results = FumbleChart.getResults(7, skill);
    expect(results).toBe('Failed and made worse. Try again at +5 DIFF.');
  });

  it('should int results', () => {
    skill.stat = 'INT';
    skill.name = 'Weaponsmith';
    const results = FumbleChart.getResults(7, skill);
    expect(results).toBe('No clue on anything. -2 to convince others you\'re not dumb.');
  });


  it('should cool results', () => {
    skill.stat = 'COOL';
    skill.name = 'Intimidate';
    const results = FumbleChart.getResults(7, skill);
    expect(results).toBe('No fumble, just didn\'t succeed');
  });
});
