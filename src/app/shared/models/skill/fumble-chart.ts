import { Cp2020PlayerSkill } from './../cp2020character/cp2020-player-skill';
export class FumbleChart {
  static getResults(roll: number, skill: Cp2020PlayerSkill): string {
    const stat = skill.stat;
    // test if combat skill
    const isCombat: boolean = (skill.stat.toLowerCase() === 'ref'
    && ( skill.name.toLowerCase().includes('martial')
      || skill.name.toLowerCase().includes('brawl')
      || skill.name.toLowerCase().includes('melee')
      || skill.name.toLowerCase().includes('handgun')
      || skill.name.toLowerCase().includes('smg')
      || skill.name.toLowerCase().includes('submachine')
      || skill.name.toLowerCase().includes('weapon')
      || skill.name.toLowerCase().includes('fence')
      || skill.name.toLowerCase().includes('rifle')
    ));
    if (stat.toLowerCase() === 'ref' && isCombat) {
      switch (roll) {
        case 5:
          return 'Drop weapon.';
        case 6:
          return 'Weapon discharge (non-auto make REL roll) or hits something harmless.';
        case 7:
          return 'Weapon jam (non-auto make REL roll) or imbeds itself for 1 turn.';
        case 8:
          return 'You wound yourself.';
        case 9:
        case 10:
          return 'Wound a team mate.';
      }
    }
    if (stat.toLowerCase() === 'ref' && !isCombat) {
      switch (roll) {
        case 5:
        case 6:
        case 7:
          return 'Take 1 point of dmaage plus Stun Save.';
        case 8:
        case 9:
        case 10:
          return 'Take 1D6 damage and Stun Save -1.';
      }
    }
    if (stat.toLowerCase() === 'tech') {
      switch (roll) {
        case 5:
        case 6:
        case 7:
          return 'Failed and made worse. Try again at +5 DIFF.';
        case 8:
        case 9:
        case 10:
          return 'Damaged beyond repair. Needs replacement.';
      }
    }
    if (stat.toLowerCase() === 'emp') {
      switch (roll) {
        case 5:
        case 6:
          return 'Failed and -4 to next EMP roll.';
        case 7:
        case 8:
        case 9:
        case 10:
          return 'Possible violent reaction on a 4 or less on a 1D10 roll.';
      }
    }
    if (stat.toLowerCase() === 'int') {
      switch (roll) {
        case 5:
        case 6:
        case 7:
          return 'No clue on anything. -2 to convince others you\'re not dumb.';
        case 8:
        case 9:
        case 10:
          return 'Failed an everyone knows how ignorant you are.';
      }
    }
    return 'No fumble, just didn\'t succeed';
  }
}
