import { SourceBookLookup } from './../../shared/models/source-book-lookup';
import { Cp2020Role } from './../../shared/models/cp2020character/cp2020-role';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'cs-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  filters = {role: '', base: '', sa: '', skill: '', source: ''};
  roleList: Cp2020Role[] = new Array<Cp2020Role>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService
    .GetJson('json/apps/chargen/cp2020rolesext.json')
    .subscribe( data => {
      this.roleList = data.roles.sort( (a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    });
  }

  /**
   * Get the skill string to show.
   *
   * @param {*} sk
   * @returns {string}
   * @memberof RoleListComponent
   */
  getSkill(sk: any): string {
    if ( Array.isArray(sk)) {
      return sk.join(' or ');
    }
    return sk.replace('\\', '');
  }
}
