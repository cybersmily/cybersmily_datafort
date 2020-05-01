import { LifepathEvent } from './lifepath-event';
import { LifepathEthnicity } from './lifepath-ethnicity';
import { LifepathAppearance } from './lifepath-appearance';
import { LifepathMotivations } from './lifepath-motivations';
import { LifepathFamily } from './lifepath-family';

export class LifePathResults {
  motivations: LifepathMotivations;
  appearance: LifepathAppearance;
  family: LifepathFamily;
  ethnicity: LifepathEthnicity;
  events: LifepathEvent[];

  constructor() {
    this.motivations = new LifepathMotivations();
    this.appearance = new LifepathAppearance();
    this.family = new LifepathFamily();
    this.ethnicity = new LifepathEthnicity();
    this.events = new Array<LifepathEvent>();
  }

  print(): string {
    let output = '';
    output += 'LIFEPATH\r\n';
    output += ' Style\r\n';
    output += `  Clothes       ${this.appearance.clothes}\r\n`;
    output += `  Hair          ${this.appearance.hairstyle}\r\n`;
    output += `  Affectations  ${this.appearance.affectations}\r\n`;
    output += `  Ethnicity     ${this.ethnicity.name}\r\n`;
    output += `  Language      ${this.ethnicity.language}\r\n`;
    output += '\r\n';
    output += ' Family Background\r\n';
    output += `  ${this.family.familyRanking} family ranking. ${this.family.familyBackground}\r\n`;
    output += `  #Siblings`;
    output += ` ${this.family.siblings.getBrothersCount()} brothers`;
    output += ` and ${this.family.siblings.getSistersCount()} sisters\r\n`;
    output += '\r\n';
    output += ` Motivtaions\r\n`;
    output += `  Traits             ${this.motivations.personality}\r\n`;
    output += `  Valued Person      ${this.motivations.valuedperson}\r\n`;
    output += `  Valued Most        ${this.motivations.valuemost}\r\n`;
    output += `  Feel About People  ${this.motivations.feelaboutpeople}\r\n`;
    output += `  Valued Posession   ${this.motivations.valuedpossession}\r\n`;
    output += '\r\n';
    output += ` Life Events\r\n`;
    this.events.forEach( e => {
      output += `  ${e.age} - ${e.event}\r\n`;
    });
    return output;
  }
}
