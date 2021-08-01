import { CPRedLifePathFamily } from './c-p-red-life-path-family';
import { CPRedLifePathMotivations } from './c-p-red-life-path-motivations';
import { CPRedLifePathAppearance } from './c-p-red-life-path-appearance';
import { CPRedLifePathLoveaffair } from './c-p-red-life-path-loveaffair';
import { CPRedLifePathCulture } from './c-p-red-life-path-culture';
import { CPRedLifePathEnemy } from './c-p-red-life-path-enemy';
import { CPRedLifePathFriend } from './c-p-red-life-path-friend';
import { KeyValue } from '@angular/common';
export class CPRedLifePathCore {
  culture: CPRedLifePathCulture;
  appearance: CPRedLifePathAppearance;
  motivations: CPRedLifePathMotivations;
  friends: Array<CPRedLifePathFriend>;
  enemies: Array<CPRedLifePathEnemy>;
  loveAffairs: Array<CPRedLifePathLoveaffair>;
  family: CPRedLifePathFamily;
  role: Array<KeyValue<string, string>>;

  constructor(param?:any) {
    this.culture = new CPRedLifePathCulture(param && param.culture);
    this.appearance = new CPRedLifePathAppearance(param && param.appearance);
    this.motivations = new CPRedLifePathMotivations(param && param.motivations);
    this.friends = new Array<CPRedLifePathFriend>();
    if( param && Array.isArray(param.friends)) {
      this.friends = param.friends.map( friend => new CPRedLifePathFriend(friend));
    }
    this.enemies = new Array<CPRedLifePathEnemy>();
    if( param && Array.isArray(param.enemies)) {
      this.enemies = param.enemies.map( enemy => new CPRedLifePathEnemy(enemy));
    }
    this.loveAffairs = new Array<CPRedLifePathLoveaffair>();
    if( param && Array.isArray(param.loveAffairs)) {
      this.loveAffairs = param.loveAffairs.map( lover => new CPRedLifePathLoveaffair(lover));
    }
    this.family = new CPRedLifePathFamily(param && param.family);
    this.role = param? param.role : new Array<KeyValue<string, string>>();
  }
  print(): string {
    let output = '';
    output += 'LIFEPATH\r\n';
    output += `  Culture: ${this.culture.name} (language: ${this.culture.language})\r\n`;
    output += '  Appearance\r\n';
    output += `    Hairstyle: ${this.appearance.hairstyle}\r\n`;
    output += `    Clothing: ${this.appearance.clothing}\r\n`;
    output += `    Affectations: ${this.appearance.affectations}\r\n`;
    output += '\r\n';
    output += '  Motivations\r\n';
    output += `    Personality: ${this.motivations.personality}\r\n`;
    output += `    Value Most: ${this.motivations.valueMost}\r\n`;
    output += `    Valued Possession: ${this.motivations.valuedPossession}\r\n`;
    output += `    Valued Person: ${this.motivations.valuedPerson}\r\n`;
    output += `    Feel About People: ${this.motivations.feelAboutPeople}\r\n`;
    output += `    Goal: ${this.motivations.goal}\r\n`;
    output += '\r\n';
    output += `  Friends (${this.friends.length})\r\n`;
    this.friends.forEach( e => {
      output += `    - ${e.who}\r\n`;
    });
    output += '\r\n';
    output += `  Enemies (${this.enemies.length})\r\n`;
    this.enemies.forEach( e => {
      output += `    - ${e.who} ${e.cause} ${e.resources} ${e.reaction}\r\n`;
    });
    output += '\r\n';
    output += `  Romances (${this.loveAffairs.length})\r\n`;
    this.loveAffairs.forEach( e => {
      output += `    - ${e}\r\n`;
    });
    output += '\r\n';
    output += '  Family\r\n';
    output += `    Background: ${this.family.background}\r\n`;
    output += `    Childhood Environment: ${this.family.childhoodEnvironment}\r\n`;
    output += `    Family Crisis: ${this.family.familyCrisis}\r\n`;
    output += '\r\n';
    output += '  Role\r\n';
    this.role.forEach( e => {
      output += `    ${e.key}: ${e.value}\r\n`;
    });
    output += '\r\n';
    return output;
  }
}
