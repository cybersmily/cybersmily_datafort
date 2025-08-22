import { DataSkill } from './../../cp2020-skills/models/data-skill';
import { SkillListService } from './../../cp2020-skills/services/skill-list.service';
import {
  faSearch,
  faSearchLocation,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { forkJoin, Observable, map, first } from 'rxjs';
import { JsonDataFiles } from './../../../services/file-services/json-data-files';
import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020RolesDataService } from './../services/cp2020-roles-data.service';
import { Cp2020PlayerRole } from './../models/cp2020-player-role';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Cp2020Role } from '../models';
import { Cp2020PlayerSkill } from '../../cp2020-skills/models';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Data } from '@angular/router';

@Component({
    selector: 'cs-cp2020-role-editor',
    templateUrl: './cp2020-role-editor.component.html',
    styleUrls: ['./cp2020-role-editor.component.css'],
    standalone: false
})
export class Cp2020RoleEditorComponent
  implements OnInit, OnChanges, AfterViewInit
{
  faSearch = faSearch;
  faTrash = faTrash;
  optionOnBlur: any;

  @Input()
  role: Cp2020PlayerRole = new Cp2020PlayerRole();

  @Input()
  isIU: boolean = false;

  @Input()
  showDelete: boolean = false;

  @Input()
  isFocus: boolean = false;

  @Output()
  updateRole: EventEmitter<Cp2020PlayerRole> = new EventEmitter<Cp2020PlayerRole>();

  @Output()
  deleteRole: EventEmitter<Cp2020PlayerRole> = new EventEmitter<Cp2020PlayerRole>();

  @ViewChild('roleName', { static: false })
  roleNameElem: ElementRef;

  currentRole: Cp2020PlayerRole = new Cp2020PlayerRole();

  roleData: Array<Cp2020Role> = new Array<Cp2020Role>();

  roleList: Array<string> = new Array<string>();
  selectedRole: Cp2020Role = new Cp2020Role();
  roleSkills: Array<any> = new Array<any>();
  selectedSkills: Array<string> = ['', '', '', '', '', '', '', '', '', ''];
  cp2020NumOfSkill: number = 9;
  iuNumOfSkill: number = 3;
  skillList$: Observable<Array<string>>;
  specialAbilites$: Observable<Array<string>>;

  get salary(): number {
    return this.currentRole?.salary || 0;
  }

  set salary(value: number) {
    this.currentRole.salary = value;
  }
  constructor(
    private roleService: Cp2020RolesDataService,
    private skillListService: SkillListService
  ) {}

  ngOnInit(): void {
    this.skillList$ = this.skillListService.Skills.pipe(
      first(),
      map((skills) =>
        skills.map(
          (skill) => skill.name + (skill.option ? `: ${skill.option}` : '')
        )
      )
    );
    this.specialAbilites$ = this.skillListService.SpecialAbilities.pipe(
      first(),
      map((skills) => skills.map((sk) => sk.name))
    );

    this.loadData();
  }

  ngOnChanges(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    if (this.isFocus) {
      this.roleNameElem.nativeElement.focus();
    }
  }

  private loadData() {
    this.currentRole = new Cp2020PlayerRole(this.role);
    this.roleSkills = this.currentRole.skills;
    this.selectedSkills = this.currentRole.skills.map((skill) =>
      Array.isArray(skill) ? '' : skill
    );
    if (this.currentRole.name === '') {
      this.fillSkillArraysBlank();
    }
    const roles = this.roleService.getRoles(this.isIU);
    forkJoin({ roles }).subscribe((data) => {
      this.roleData = data.roles;
      const found = this.roleData.findIndex(
        (role) =>
          role.name.toLowerCase() === this.currentRole.name.toLowerCase()
      );
      if (found > -1) {
        this.selectedRole = this.roleData[found];
      }
      this.roleList = this.roleData.map(
        (role) => (role.base ? `${role.base} - ` : ``) + role.name
      );
    });
  }

  updateRoleName() {
    const selected = this.currentRole.name.split(' - ');
    const name = selected.length > 1 ? selected[1] : selected[0];
    const found = this.roleData.findIndex(
      (role) => role.name.toLocaleLowerCase() === name?.toLocaleLowerCase()
    );
    if (found > -1) {
      this.selectedRole = this.roleData[found];
      this.currentRole.specialAbility = new Cp2020PlayerSkill(
        this.selectedRole.specialability
      );
      this.roleSkills = this.selectedRole.skills.map((sk) => sk);
      this.currentRole.skills = this.selectedRole.skills.map((sk) => {
        if (Array.isArray(sk)) {
          return '';
        } else {
          sk = sk.replace('\\&', '&');
        }
        return sk;
      });
    } else {
      this.currentRole.specialAbility = new Cp2020PlayerSkill();
      this.fillSkillArraysBlank();
    }
    this.update();
  }

  update() {
    this.updateRole.emit(this.currentRole);
  }

  updateSkill(event, index) {
    if (index > -1 && index < this.currentRole.skills.length) {
      this.currentRole.skills[index] = event.target.value;
      this.update();
    }
  }

  delete() {
    this.deleteRole.emit(this.currentRole);
  }

  /**
   * Fills the currentRole and roleSkills with blank values for player input.
   *
   * @memberof Cp2020RoleEditorComponent
   */
  fillSkillArraysBlank() {
    const length = this.isIU ? this.iuNumOfSkill : this.cp2020NumOfSkill;
    this.currentRole.skills = new Array(length).fill('', 0, length);
    this.roleSkills = new Array(length).fill('', 0, length);
  }

  /**
   * return the role skill as a string if it is an array.
   *
   * @param {*} skill
   * @return {*}  {string}
   * @memberof Cp2020RoleSectionComponent
   */
  isArray(skill: any): boolean {
    return Array.isArray(skill);
  }

  getSkillOptions(index: number): Array<string> {
    return [...this.selectedRole.skills[index]];
  }
}
