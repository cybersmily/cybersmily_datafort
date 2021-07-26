import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkill } from './../models/cp2020-player-skill';
import { Cp2020Stat } from './../../cp2020-stats/models/cp2020-stat';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cp2020-skill-stat-section',
  templateUrl: './cp2020-skill-stat-section.component.html',
  styleUrls: ['./cp2020-skill-stat-section.component.css']
})
export class Cp2020SkillStatSectionComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  modalRef: BsModalRef;
  modalConfig = {

  };

  @Input()
  title: string = '';

  @Input()
  stat: Cp2020Stat = new Cp2020Stat();

  @Input()
  skills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  currSkills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  @Input()
  sa: boolean = false;

  @Output()
  changeSkill = new EventEmitter<Cp2020PlayerSkill>();

  @Output()
  addSkill = new EventEmitter<Cp2020PlayerSkill>();

  @Output()
  deleteSkill = new EventEmitter<Cp2020PlayerSkill>();

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.currSkills = new Array(...this.skills);
    this.currSkills.sort( (a,b) => (a.name.toLowerCase() === b.name.toLowerCase() && a.option && b.option) ? a.option.localeCompare(b.option) : a.name.localeCompare(b.name));
  }

  ngOnChanges(): void {
    this.currSkills = new Array(...this.skills);
    this.currSkills.sort( (a,b) => (a.name.toLowerCase() === b.name.toLowerCase() && a.option && b.option) ? a.option.localeCompare(b.option) : a.name.localeCompare(b.name));
  }

  getColumnOne(): Array<Cp2020PlayerSkill> {
    const multi = (this.currSkills.length%3 === 0) ? 0.33 : 0.34;
    return this.currSkills.slice(0, Math.ceil(this.currSkills.length * multi));
  }

  getColumnTwo(): Array<Cp2020PlayerSkill> {
    const multi = (this.currSkills.length%3 === 0) ? 0.33 : 0.34;
    const start = Math.ceil(this.currSkills.length * multi);
    const end = Math.ceil(this.currSkills.length * 0.33);
    return this.currSkills.slice(start, start + end);
  }

  getColumnThree(): Array<Cp2020PlayerSkill> {
    const multi = (this.currSkills.length%3 === 0) ? 0.66 : 0.67;
    return this.currSkills.slice(Math.ceil(this.currSkills.length * multi));
  }

  onChangeSkill(skill: Cp2020PlayerSkill) {
    this.changeSkill.emit(skill);
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  addNewSkill(skill: Cp2020PlayerSkill) {
    skill.value = 0;
    skill.ip = 0;
    this.modalRef.hide();
    this.addSkill.emit(skill);
  }

  deleteCurrentSkill(skill:Cp2020PlayerSkill) {
    this.deleteSkill.emit(skill);
  }
}