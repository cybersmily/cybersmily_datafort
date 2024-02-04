import { Cp2020SkillUpdate } from './../models/cp2020-skill-update';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  faPlus,
  faChevronRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkill } from './../models/cp2020-player-skill';
import { Cp2020Stat } from './../../cp2020-stats/models/cp2020-stat';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'cs-cp2020-skill-stat-section',
  templateUrl: './cp2020-skill-stat-section.component.html',
  styleUrls: ['./cp2020-skill-stat-section.component.css'],
})
export class Cp2020SkillStatSectionComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  modalRef: BsModalRef;
  modalConfig = {};
  isCollapsed = false;

  @Input()
  title: string = '';

  @Input()
  stat: Cp2020Stat = new Cp2020Stat();

  @Input()
  skills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  currSkills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  @Input()
  sa: boolean = false;

  @Input()
  showAddSkill: boolean = true;

  @Output()
  changeSkill = new EventEmitter<Cp2020SkillUpdate>();

  @Output()
  addSkill = new EventEmitter<Cp2020PlayerSkill>();

  @Output()
  deleteSkill = new EventEmitter<Cp2020PlayerSkill>();

  get collapseArrow(): any {
    return this.isCollapsed ? this.faChevronRight : this.faChevronDown;
  }

  get columnLength(): number {
    return Math.ceil(
      this.currSkills.length * (this.currSkills.length % 3 === 0 ? 0.33 : 0.34)
    );
  }

  get statName(): string {
    return this.skills.length > 0 && this.skills[0].stat && !this.skills[0].isSA
      ? this.skills[0].stat.toLowerCase()
      : this.skills[0].isSA
      ? 'special abillity'
      : 'other';
  }

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    this.currSkills = new Array(...this.skills);
    this.currSkills.sort((a, b) =>
      a.name.toLowerCase() === b.name.toLowerCase() && a.option && b.option
        ? a.option.localeCompare(b.option)
        : a.name.localeCompare(b.name)
    );
  }

  ngOnChanges(): void {
    this.currSkills = new Array(...this.skills);
    this.currSkills.sort((a, b) =>
      a.name.toLowerCase() === b.name.toLowerCase() && a.option && b.option
        ? a.option.localeCompare(b.option)
        : a.name.localeCompare(b.name)
    );
  }

  onChangeSkill(skillUpdate: Cp2020SkillUpdate) {
    this.changeSkill.emit(skillUpdate);
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

  deleteCurrentSkill(skill: Cp2020PlayerSkill) {
    this.deleteSkill.emit(skill);
  }
}
