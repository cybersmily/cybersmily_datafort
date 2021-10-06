import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnChanges } from '@angular/core';
import { Cp2020Stat, StatModifier } from './../../cp2020-stats/models/cp2020-stat';
import { FumbleChart } from './../../../models/skill/fumble-chart';
import { DiceService } from './../../../services/dice/dice.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Cp2020PlayerSkill, MartialBonuses } from '../models';
import { faDice, faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp2020-skill',
  templateUrl: './cp2020-skill.component.html',
  styleUrls: ['./cp2020-skill.component.css']
})
export class Cp2020SkillComponent implements OnInit, OnChanges {
  modalRef: BsModalRef;
  dieRoll = 0;
  totalRoll = 0;
  rollMessage = '';
  faDice = faDice;
  faTrash = faTrash;
  faPen = faPen;
  faPlus = faPlus;

  @Input()
  skill = new Cp2020PlayerSkill();
  currSkill = new Cp2020PlayerSkill();

  newModifier: StatModifier = { name: '', mod: 0};

  @Input()
  stat = new Cp2020Stat();

  @Input()
  sa = false;

  @Output()
  changeSkill = new EventEmitter<Cp2020PlayerSkill>();

  @Output()
  delete = new EventEmitter<Cp2020PlayerSkill>();

  get isMA(): boolean {
    return (this.currSkill.maBonuses) ? true : false;
  }

  get nextLevelIP(): number {
    const base = 10 * (this.currSkill.ipMod) ?? 1;
    if (this.currSkill.value < 1) {
      return base;
    }
    return  base * this.currSkill.value;
  }

  get modifierTotal(): number {
    return (this.currSkill.modifiers) ? this.currSkill.modifiers.reduce( (a, b) => a + b.mod, 0): 0;
  }

  constructor(private modalService: BsModalService, private dice: DiceService) { }

  ngOnInit() {
    this.currSkill = new Cp2020PlayerSkill(this.skill);
    if (this.currSkill.isSecondarySkill) {
    }
  }
  ngOnChanges() {
  }

  onChangeSkill() {
    this.changeSkill.emit(this.currSkill);
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
      this.rollMessage += FumbleChart.getResults(this.dice.generateNumber(1, 10), this.currSkill);
    }
    if (this.dieRoll > 10) {
      this.rollMessage = 'CRITICAL SUCCESS!';
    }
    this.totalRoll = this.dieRoll + this.currSkill.value + ((this.stat) ? this.stat.Adjusted : 0) + this.modifierTotal;
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteSkill() {
    const retVal = confirm('Are you sure you want to delete the skill?')
    if(retVal === true) {
      this.modalRef.hide();
      this.delete.emit(this.currSkill);
    }
  }

  addModifier() {
    if(!this.currSkill.modifiers) {
      this.currSkill.modifiers = new Array<StatModifier>();
    }
    this.currSkill.modifiers.push({name: this.newModifier.name, mod: this.newModifier.mod});
    this.changeSkill.emit(this.currSkill);
    this.newModifier = {name: '', mod: 0};
  }

  toggleMA() {
    if(this.currSkill.maBonuses) {
      this.currSkill.maBonuses = undefined;
    } else {
      this.currSkill.maBonuses = new MartialBonuses();
    }
  }
}
