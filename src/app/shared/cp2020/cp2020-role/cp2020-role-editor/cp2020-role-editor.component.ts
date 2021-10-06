import { faSearch, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
import { JsonDataFiles } from './../../../services/file-services/json-data-files';
import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020RolesDataService } from './../services/cp2020-roles-data.service';
import { DataService } from './../../../services/file-services/data.service';
import { Cp2020PlayerRole } from './../models/cp2020-player-role';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Cp2020Role } from '../models';
import { Cp2020PlayerSkill } from '../../cp2020-skills/models';

@Component({
  selector: 'cs-cp2020-role-editor',
  templateUrl: './cp2020-role-editor.component.html',
  styleUrls: ['./cp2020-role-editor.component.css']
})
export class Cp2020RoleEditorComponent implements OnInit, OnChanges {
  faSearch = faSearch;

  @Input()
  role: Cp2020PlayerRole = new Cp2020PlayerRole();

  @Input()
  isIU: boolean = false;

  @Output()
  updateRole: EventEmitter<Cp2020PlayerRole> = new EventEmitter<Cp2020PlayerRole>();

  currentRole: Cp2020PlayerRole = new Cp2020PlayerRole();

  roleData: Array<Cp2020Role> = new Array<Cp2020Role>();

  roleList: Array<string> = new Array<string>();
  roleSkills: Array<any> = new Array<any>();
  cp2020NumOfSkill: number = 9;
  iuNumOfSkill: number = 3;

  get salary(): number {
    return this.currentRole?.salary || 0;
  }

  set salary(value: number) {
    this.currentRole.salary = value;
  }

  constructor( private roleService: Cp2020RolesDataService, private dice: DiceService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(): void {
    this.loadData();
  }

  private loadData() {
    this.currentRole = new Cp2020PlayerRole(this.role);
    this.roleSkills = this.currentRole.skills;
    if(this.currentRole.name === '') {
      this.fillSkillArraysBlank();
    }
    const roles = this.roleService.getRoles(this.isIU);
    forkJoin({roles}).subscribe(data => {
      this.roleData = data.roles;
      this.roleList = this.roleData.map( role => (role.base ? `${role.base} - `: ``) + role.name );
    });
  }

  updateRoleName() {
    const selected = this.currentRole.name.split(' - ');
    const name = selected.length > 1 ? selected[1] : selected[0];
    const found = this.roleData.findIndex(role => role.name.toLocaleLowerCase() === name?.toLocaleLowerCase());
    if (found > -1) {
      const role = this.roleData[found];
      this.currentRole.specialAbility = new Cp2020PlayerSkill(role.specialability);
      this.roleSkills = role.skills.map(sk => sk);
      this.currentRole.skills = role.skills.map( sk => {
        return (Array.isArray(sk) ? sk.join(' or ') : sk.replace("\\&", '&'));
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
    if(index > -1 && index < this.currentRole.skills.length){
      this.currentRole.skills[index] = event.target.value;
      console.log('currentRole.Skills', this.currentRole.skills);
      this.update();
    }
  }


  /**
   * Fills the currentRole and roleSkills with blank values for player input.
   *
   * @memberof Cp2020RoleEditorComponent
   */
  fillSkillArraysBlank() {
    const length = this.isIU ? this.iuNumOfSkill : this.cp2020NumOfSkill;
    this.currentRole.skills = new Array(length).fill('',0, length);
    this.roleSkills = new Array(length).fill('',0, length);
  }


  /**
   * return the role skill as a string if it is an array.
   *
   * @param {*} skill
   * @return {*}  {string}
   * @memberof Cp2020RoleSectionComponent
   */
   isArray(skill:any): boolean {
    return Array.isArray(skill);
  }
}
