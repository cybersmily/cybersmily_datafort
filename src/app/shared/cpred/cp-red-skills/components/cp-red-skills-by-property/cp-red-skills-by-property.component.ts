import { Component, OnInit, Input } from '@angular/core';
import { CpRedCharacterSkill } from '../../models';

@Component({
    selector: 'cs-cp-red-skills-by-property',
    templateUrl: './cp-red-skills-by-property.component.html',
    styleUrls: ['./cp-red-skills-by-property.component.css'],
    standalone: false
})
export class CpRedSkillsByPropertyComponent implements OnInit {
  @Input()
  skills: Array<CpRedCharacterSkill>;

  @Input()
  property: string = '';

  prop: string = '';
  constructor() {}

  ngOnInit(): void {}

  propChange(skill: CpRedCharacterSkill): boolean {
    if (this.property === '') {
      return false;
    }
    if (skill[this.property] === this.prop) {
      return false;
    }
    this.prop = skill[this.property];
    return true;
  }

  roundUp(value: number, multiplier: number): number {
    return Math.ceil(value * multiplier);
  }
}
