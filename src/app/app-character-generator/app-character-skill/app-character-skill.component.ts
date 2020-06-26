import { FumbleChart } from './../../shared/models/skill/fumble-chart';
import { DiceService } from './../../shared/services/dice/dice.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Cp2020Stat } from './../../shared/models/cp2020character/cp2020-stat';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Cp2020PlayerSkill } from './../../shared/models/cp2020character/cp2020-player-skill';
import { faDice } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-app-character-skill',
  templateUrl: './app-character-skill.component.html',
  styleUrls: ['./app-character-skill.component.css']
})
export class AppCharacterSkillComponent implements OnInit {
  modalRef: BsModalRef;
  dieRoll = 0;
  totalRoll = 0;
  rollMessage = '';
  faDice = faDice;

  @Input()
  skill = new Cp2020PlayerSkill();

  @Input()
  stat = new Cp2020Stat();

  @Input()
  isSpecialAbility = false;

  @Output()
  changeSkill = new EventEmitter<Cp2020PlayerSkill>();

  constructor(private modalService: BsModalService, private dice: DiceService) { }

  ngOnInit() {
    if (this.skill.isSecondarySkill) {
      console.log(this.skill);
    }
  }

  onChangeSkill() {
    this.changeSkill.emit(this.skill);
  }

  onClick(template: TemplateRef<any>) {
    let roll = 0;
    this.rollMessage = '';
    this.dieRoll = 0;
    do {
      roll = this.dice.generateNumber(1, 10);
      this.dieRoll += roll;
    } while (roll > 9);
    if (this.dieRoll < 2) {
      this.rollMessage = 'FUMBLE! ';
      this.rollMessage += FumbleChart.getResults(this.dice.generateNumber(1, 10), this.skill);
    }
    if (this.dieRoll > 10) {
      this.rollMessage = 'CRITICAL SUCCESS!';
    }
    this.totalRoll = this.dieRoll + this.skill.value + ((this.stat) ? this.stat.Adjusted : 0);
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
  }
}
