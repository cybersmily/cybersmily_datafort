import { MartialBonuses } from './../models';
import { Cp2020PlayerSkill } from './../models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-skill-new',
  templateUrl: './cp2020-skill-new.component.html',
  styleUrls: ['./cp2020-skill-new.component.css']
})
export class Cp2020SkillNewComponent implements OnInit {

  @Input()
  skill: Cp2020PlayerSkill = new Cp2020PlayerSkill();

  @Output()
  updateSkill: EventEmitter<Cp2020PlayerSkill> = new EventEmitter<Cp2020PlayerSkill>();

  currSkill: Cp2020PlayerSkill;

  isMA: boolean = false;

  newMA: MartialBonuses;

  constructor() { }

  ngOnInit(): void {
    this.currSkill = JSON.parse(JSON.stringify(this.skill));
  }

  update(){
    this.updateSkill.emit(this.currSkill);
  }

  addMA() {
    this.newMA = {
      strike: 0,
      kick: 0,
      block: 0,
      dodge: 0,
      throw: 0,
      hold: 0,
      escape: 0,
      choke: 0,
      sweep: 0,
      grapple: 0
    }
  }

}
