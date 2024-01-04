import { faDice, faChevronDown, faTrash, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkill,DataSkill, FumbleChart } from './../models';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DiceService } from '../../../services/dice/dice.service';
import { SkillListService } from '../services';
import { Cp2020StatBlock } from '../../cp2020-stats/models';
import { Cp2020SkillUpdate } from '../models/cp2020-skill-update';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cs-cp2020-skill-list-short',
  templateUrl: './cp2020-skill-list-short.component.html',
  styleUrls: ['./cp2020-skill-list-short.component.css'],
})
export class Cp2020SkillListShortComponent implements OnInit, OnChanges {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  dice = faDice;
  faTrash = faTrash;
  faPlus = faPlus;
  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  @Input()
  isCollapsed = true;

  @Input()
  characterSpAbilites: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();
  currentSpecialAbilities: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  @Input()
  characterSkills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();
  currentSkills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  @Input()
  characterStats: Cp2020StatBlock = new Cp2020StatBlock();


  @Output()
  updateSkills = new EventEmitter<Array<Cp2020PlayerSkill>>();

  @Output()
  updateSpecialAbilities = new EventEmitter<Array<Cp2020PlayerSkill>>();

  newSkill: Cp2020PlayerSkill = new Cp2020PlayerSkill();

  specialAbilites: Array<DataSkill> = new Array<DataSkill>();
  skills: Array<DataSkill> = new Array<DataSkill>();
  skillResults = '';

  get columnOneSkills(): Array<Cp2020PlayerSkill> {
    return this.currentSkills.slice(0, Math.ceil(this.currentSkills.length/2))
  }

  get columnTwoSkills(): Array<Cp2020PlayerSkill> {
    return this.currentSkills.slice(Math.ceil(this.currentSkills.length/2))
  }

  constructor(private diceRoll: DiceService, private skillList: SkillListService, private modalService: BsModalService) { }

  ngOnInit() {
    this.currentSkills = this.characterSkills.map(sk => new Cp2020PlayerSkill(sk));
    this.currentSpecialAbilities = this.characterSpAbilites.map(sk => new Cp2020PlayerSkill(sk));
    if (this.skills.length < 1) {
      this.skillList.Skills.subscribe( list => {
        this.skills = list.filter( sk => !sk.sa);
        this.specialAbilites = list.filter( sk => sk.sa);
      });
    }
  }

  ngOnChanges() {
    this.currentSkills = this.characterSkills.map(sk => new Cp2020PlayerSkill(sk));
    this.currentSpecialAbilities = this.characterSpAbilites.map(sk => new Cp2020PlayerSkill(sk));
    this.newSkill = new Cp2020PlayerSkill();
  }

  addSKill(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  addNewSkill(skill: Cp2020PlayerSkill) {
    if(skill?.isSA) {
      this.currentSpecialAbilities.push(new Cp2020PlayerSkill(skill));
      this.updateSpecialAbilities.emit(this.currentSpecialAbilities);
    } else {
      this.currentSkills.push(new Cp2020PlayerSkill(skill));
      this.updateSkills.emit(this.currentSkills);
    }
    this.modalRef.hide();
  }

  changeSkill(skill: Cp2020SkillUpdate) {
    const index = this.currentSkills.findIndex(sk => sk.name === skill.current.name);
    if( index >= 0) {
      this.currentSkills[index] = new Cp2020PlayerSkill(skill.update);
    }
    this.updateSkills.emit(this.currentSkills);
  }

  changeSpecialAbility(skill: Cp2020SkillUpdate) {
    const index = this.currentSpecialAbilities.findIndex(sk => sk.name === skill.current.name);
    if( index >= 0) {
      this.currentSpecialAbilities[index] = new Cp2020PlayerSkill(skill.update);
    }
    this.updateSpecialAbilities.emit(this.currentSpecialAbilities);
  }


  changeSA() {
  }


  getStatValue(stat: string): number {
    return this.characterStats[stat?.toUpperCase()]?.Adjusted ?? 0;
  }

  generateSkillLevels() {
    if (this.currentSkills.length < 1) {
      alert('Need to add skills. This button will fill them in with random values.');
    } else {
      for(let i = 0; i < this.currentSkills.length; i++) {
        this.currentSkills[i].value = this.diceRoll.generateNumber(1,10);
      }
      this.updateSkills.emit(this.currentSkills);

    }
  }

  closeModal() {
    this.modalRef.hide();
  }

  deleteSA(skill: Cp2020PlayerSkill) {
    this.updateSpecialAbilities.emit(this.currentSpecialAbilities.filter(sk => {return sk.name !== skill.name}));
  }

  deleteSkill(skill: Cp2020PlayerSkill) {
    this.updateSkills.emit(this.currentSkills.filter(sk => {return sk.name !== skill.name}));
  }

}
