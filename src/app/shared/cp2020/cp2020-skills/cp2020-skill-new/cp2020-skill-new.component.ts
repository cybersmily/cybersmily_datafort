import { faSave } from '@fortawesome/free-solid-svg-icons';
import { MartialBonuses } from './../models';
import { Cp2020PlayerSkill } from './../models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-skill-new',
  templateUrl: './cp2020-skill-new.component.html',
  styleUrls: ['./cp2020-skill-new.component.css'],
})
export class Cp2020SkillNewComponent implements OnInit {
  faSave = faSave;

  @Input()
  skill: Cp2020PlayerSkill = new Cp2020PlayerSkill();

  @Input()
  stat: string = '';

  @Output()
  updateSkill: EventEmitter<Cp2020PlayerSkill> = new EventEmitter<Cp2020PlayerSkill>();

  currSkill: Cp2020PlayerSkill;

  isMA: boolean = false;

  newMA: MartialBonuses;

  get skillParents(): Array<string> {
    switch (this.currSkill.stat) {
      case 'int':
        return ['Expert', 'Language'];
      case 'ref':
        return ['Martial Arts', 'Pilot'];
      default:
        return [];
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.currSkill = new Cp2020PlayerSkill(this.skill);
    console.log(this.stat);
    if (
      !this.stat.toLowerCase().startsWith('special') &&
      this.stat.toLowerCase() !== 'other'
    ) {
      this.currSkill.stat = this.stat.toLowerCase();
    }
    if (this.stat.toLowerCase() === 'other') {
      this.currSkill.name = 'Other';
    }
  }

  update() {
    this.updateSkill.emit(this.currSkill);
  }

  toggleMA() {
    if (this.currSkill.maBonuses) {
      this.currSkill.maBonuses = undefined;
    } else {
      this.currSkill.maBonuses = new MartialBonuses();
    }
  }
}
