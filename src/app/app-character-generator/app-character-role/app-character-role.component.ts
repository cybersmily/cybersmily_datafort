import { faDice } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
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
  faDice = faDice;

  @Input()
  role = new Cp2020PlayerRole();

  currentRole = 0;

  @Output()
  changeRole = new EventEmitter<Cp2020PlayerRole>();

  roles = new Array<Cp2020Role>();

  constructor( private rolesService: Cp2020RolesDataService, private diceService: DiceService) { }

  ngOnInit() {
    this.loadRoleData();
  }


  ngOnChanges() {
    this.setCurrentRole();
  }


  /**
   * When a role is changed in the input, this will emit the change up to the parent component.
   *
   * @memberof AppCharacterRoleComponent
   */
  onRoleChange() {
    this.mergeRole();
    this.changeRole.emit(this.role);
  }


  /**
   * Randomly roll a role for the PC
   *
   * @memberof AppCharacterRoleComponent
   */
  rollRole() {
    const roll = this.diceService.generateNumber(0, this.roles.length - 1);
    this.currentRole = roll;
    this.mergeRole();
    this.changeRole.emit(this.role);
  }


  /**
   * Copies the selected role to the current role of the PC.
   *
   * @private
   * @memberof AppCharacterRoleComponent
   */
  private mergeRole() {
    this.role.name = this.roles[this.currentRole].name;
    this.role.skills = JSON.parse(JSON.stringify(this.roles[this.currentRole].skills));;
    if (this.roles[this.currentRole].secondary) {
      this.role.secondary = JSON.parse(JSON.stringify(this.roles[this.currentRole].secondary));
    } else {
      this.role.secondary = undefined;
    }
    this.role.base = this.roles[this.currentRole].base;
    this.role.source = this.roles[this.currentRole].source;
    this.role.page = this.roles[this.currentRole].page;
    this.role.specialAbility.description = this.roles[this.currentRole].specialability.description;
    this.role.specialAbility.ipMod = this.roles[this.currentRole].specialability.ipmod;
    this.role.specialAbility.stat = this.roles[this.currentRole].specialability.stat;
    this.role.specialAbility.name = this.roles[this.currentRole].specialability.name;
  }


  /**
   * Loads the list of roles from a JSON file and fills in all the data.
   *
   * @private
   * @memberof AppCharacterRoleComponent
   */
  private loadRoleData() {
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
        if (e.secondary) {
          e.secondary = e.secondary.map( sk => {
            if (Array.isArray(sk)) {
              sk = sk.map( s => {
                return (( s.indexOf('&') > -1 ) ? s.replace('\\&', '&') : s);
              });
            } else {
              sk = (( sk.indexOf('&') > -1 ) ? sk.replace('\\&', '&') : sk);
            }
            return sk;
          });
        }
        return e;
      });
      const index = data.findIndex( role => role.name === this.role.name);
      this.currentRole = data[index];
      // remove the escape character from the JSON loading
      this.roles = data;
      this.setCurrentRole();
    });
  }


  /**
   * sets the proper index on the dropdown with the passed in role.
   *
   * @private
   * @memberof AppCharacterRoleComponent
   */
  private setCurrentRole() {
    const index = this.roles.findIndex( role => role.name === this.role.name);
    this.currentRole = index;
  }


  /**
   * Formats the sourebook info into a readable string.
   *
   * @param {string} src
   * @param {number} pg
   * @return {*}  {string}
   * @memberof AppCharacterRoleComponent
   */
  sourceInfo(src: string, pg: number): string {
    return 'Source: ' + SourceBookLookup.getSource(src) + ' pg. ' + pg;
  }
}
