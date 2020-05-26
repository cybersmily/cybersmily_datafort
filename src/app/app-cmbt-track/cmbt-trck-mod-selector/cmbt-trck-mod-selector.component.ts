import { faDice } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { Cp2020PlayerSkill } from './../../shared/models/cp2020character/cp2020-player-skill';
import { CmbtTrckOpponent, CombatModifiers } from '../../shared/models/cmbt-trck';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-mod-selector',
  templateUrl: './cmbt-trck-mod-selector.component.html',
  styleUrls: ['./cmbt-trck-mod-selector.component.css']
})
export class CmbtTrckModSelectorComponent implements OnInit {
  faDice = faDice;

  @Input()
  opponent = new CmbtTrckOpponent();

  @Output()
  updateModifiers = new EventEmitter<CombatModifiers>();

  rangeToTarget = 0;

  constructor(private diceService: DiceService) { }

  getSkill(type: string): Array<Cp2020PlayerSkill> {
    let skill = Array<Cp2020PlayerSkill>();
    switch (type) {
      case 'RIF':
        skill = [this.opponent.skills.find(s => s.name.toLowerCase() === 'rifle')];
        break;
      case 'P':
        skill = [this.opponent.skills.find(s => s.name.toLowerCase() === 'handgun')];
        break;
      case 'SHG':
        skill = [this.opponent.skills.find(s => s.name.toLowerCase() === 'rifle')];
        break;
      case 'HVY':
        skill = [this.opponent.skills.find(s => s.name.toLowerCase() === 'heavy weapons')];
        break;
      case 'MEL':
        skill = [
          this.opponent.skills.find(s => s.name.toLowerCase() === 'melee'),
          this.opponent.skills.find(s => s.name.toLowerCase() === 'fencing'),
          this.opponent.skills.find(s => s.name.toLowerCase() === 'brawling')
        ].concat(this.opponent.skills.filter(s => s.name.toLowerCase().includes('martial art')));
        break;
      case 'SMG':
        skill = [this.opponent.skills.find(s => s.name.toLowerCase() === 'submachinegun')];
        break;
      case 'Martial Arts':
        skill = this.opponent.skills.filter(s => s.name.toLowerCase().includes('martial art'));
        break;
    }
    skill = skill.filter(s => s !== undefined);
    if (skill.length < 1) {
      skill.push(new Cp2020PlayerSkill());
    }
    return skill;
  }

  ngOnInit() {
  }

}
