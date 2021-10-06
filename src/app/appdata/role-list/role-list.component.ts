import { JsonDataFiles } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Cp2020Role } from './../../shared/cp2020/cp2020-role/models/cp2020-role';
import { DataService } from './../../shared/services/file-services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  filters = {role: '', base: '', sa: '', skill: '', source: ''};
  roleList: Cp2020Role[] = new Array<Cp2020Role>();

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Role List',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Role List is a complied list of roles from Cyberpunk 2020 source books.'
    );
    this.dataService
    .GetJson(JsonDataFiles.CP2020_ROLES_LIST_JSON)
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
