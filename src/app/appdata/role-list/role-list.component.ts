import { DataListColumnParameters } from './../../shared/modules/data-list/models/data-list-parameters';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Cp2020Role } from './../../shared/cp2020/cp2020-role/models/cp2020-role';
import {
  DataService,
  JsonDataFiles,
} from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.css'],
    standalone: false
})
export class RoleListComponent implements OnInit {
  roleList$: Observable<Array<Cp2020Role>>;

  columns: Array<DataListColumnParameters> = [
    {
      header: 'role',
      headerClass: 'col-3 col-md-2 text-small',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-3 col-md-2 text-small',
      sort: 'name',
    },
    {
      header: 'base role',
      headerClass: 'col-2 d-none d-md-inline-block text-small',
      property: 'base',
      filters: 'contains',
      inputType: 'text',
      class: 'col-2 d-none d-md-inline-block text-small',
      sort: 'base',
    },
    {
      header: 'S.A.',
      headerClass: 'col-3 col-md-1 text-small',
      property: 'specialability.name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-3 col-md-1 text-small',
      sort: 'specialability.name',
    },
    {
      header: 'skills',
      headerClass: 'col-4 col-md-2 text-small',
      property: 'skills',
      filters: 'contains',
      inputType: 'array',
      class: 'col-4 col-md-2 text-xsmall',
    },
    {
      header: 'Secondary Skills',
      headerClass: 'col-2 d-none d-md-inline-block text-small',
      property: 'secondary',
      filters: 'contains',
      inputType: 'array',
      class: 'col-2 d-none d-md-inline-block text-xsmall',
    },
    {
      header: 'salary',
      headerClass: 'col-1 d-none d-md-inline-block text-small',
      property: 'salary',
      filters: 'contains',
      inputType: 'array',
      class: 'col-1 d-none d-md-inline-block text-small',
    },
    {
      header: 'source',
      headerClass: 'col-2  text-xsmall',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-2 text-xsmall',
      sort: 'source.book',
      isSourcebook: true,
    },
  ];

  constructor(private dataService: DataService, private seo: SeoService) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Role List',
      "2020-07, Cybersmily's Datafort Cyberpunk 2020 Role List is a complied list of roles from Cyberpunk 2020 source books."
    );
    this.roleList$ = this.dataService
      .GetJson(JsonDataFiles.CP2020_ROLES_LIST_JSON)
      .pipe(
        map((data: { roles: Array<Cp2020Role> }) =>
          data.roles.sort((a, b) => a.name.localeCompare(b.name))
        )
      );
  }

  /**
   * Get the skill string to show.
   *
   * @param {*} sk
   * @returns {string}
   * @memberof RoleListComponent
   */
  getSkill(sk: any): string {
    if (Array.isArray(sk)) {
      return sk.join(' or ');
    }
    return sk.replace('\\', '');
  }
}
