import { SourceBookLookup } from './../../shared/models/source-book-lookup';
import { Cp2020RolesDataService } from './../../shared/services/chargen/cp2020-roles-data.service';
import { Cp2020PlayerRole, Cp2020Role } from './../../shared/models/cp2020character';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';


@Component({
  selector: 'cs-app-character-role',
  templateUrl: './app-character-role.component.html',
  styleUrls: ['./app-character-role.component.css']
})
export class AppCharacterRoleComponent implements OnInit, OnChanges {

  @Input()
  role = new Cp2020PlayerRole();

  currentRole = new Cp2020Role();

  @Output()
  changeRole = new EventEmitter<Cp2020PlayerRole>();

  roles = new Array<Cp2020Role>();

  constructor( private rolesService: Cp2020RolesDataService) { }

  ngOnInit() {
    this.rolesService.getRoles().subscribe( (data: any[] ) => {
      // remove the escape character for &
      data = data.map( e => {
        e.skills = e.skills.map( sk => {
          if (Array.isArray(sk)) {
            sk = sk.map( s => {
              return (( s.indexOf('&') > -1 ) ? s.replace('\\&', '&') : s);
            });
          } else {
            sk = (( sk.indexOf('&') > -1 ) ? sk.replace('\\&', '&') : sk);
          }
          return sk;
        });
        return e;
      });
      const index = data.findIndex( role => role.name === this.role.name);
      this.currentRole = data[index];
      // remove the escape character from the JSON loading
      this.roles = data;
    });
  }

  ngOnChanges() {
    const index = this.roles.findIndex( role => role.name === this.role.name);
    this.currentRole = this.roles[index];
  }

  onRoleChange() {
    this.role.name = this.currentRole.name;
    this.role.skills = this.currentRole.skills;
    this.role.base = this.currentRole.base;
    this.role.source = this.currentRole.source;
    this.role.page = this.currentRole.page;
    this.role.specialAbility.description = this.currentRole.specialability.description;
    this.role.specialAbility.ipMod = this.currentRole.specialability.ipmod;
    this.role.specialAbility.stat = this.currentRole.specialability.stat;
    this.role.specialAbility.name = this.currentRole.specialability.name;
    this.changeRole.emit(this.role);
  }

  sourceInfo(src: string, pg: number): string {
    return 'Source: ' + SourceBookLookup.getSource(src) + ' pg. ' + pg;
  }
}
