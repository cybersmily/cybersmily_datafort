import { DataListColumnParameters } from './../../shared/modules/data-list/models/data-list-parameters';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { SourceBookLookup } from './../../shared/models/source-book-lookup';
import { DataSkill } from '../../shared/cp2020/cp2020-skills/models/data-skill';
import {
  DataService,
  JsonDataFiles,
} from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css'],
})
export class SkillListComponent implements OnInit {
  skillList$: Observable<Array<DataSkill>>;
  columns: Array<DataListColumnParameters> = [
    {
      header: 'name',
      headerClass: 'col-4 text-small',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-4 text-small',
      sort: 'name',
    },
    {
      header: 'stat',
      headerClass: 'col-2 text-center text-small',
      property: 'stat',
      filters: 'contains',
      inputType: 'text',
      class: 'col-2 text-center text-small',
      sort: 'stat',
    },
    {
      header: 'sa',
      headerClass: 'col-2 text-center text-small',
      property: 'sa',
      filters: 'contains',
      inputType: 'text',
      class: 'text-center col-2 text-small',
      sort: 'sa',
    },
    {
      header: 'source',
      headerClass: 'col-4 text-small',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-4 text-xsmall',
      sort: 'source.book',
      isSourcebook: true,
    },
  ];

  constructor(private dataService: DataService, private seo: SeoService) {}

  ngOnInit() {
    this.initialize();
  }
  initialize(): void {
    this.seo.updateMeta(
      'Cyberpunk 2020 Skill List',
      "2020-07, Cybersmily's Datafort Cyberpunk 2020 Skill List is a complied list of skills from Cyberpunk 2020 source books."
    );
    this.skillList$ = this.dataService
      .GetJson<Array<DataSkill>>(JsonDataFiles.CP2020_SKILLS_DATA_LIST_JSON)
      .pipe(
        map((data) =>
          data
            .map((skill) => {
              if (skill.option && skill.option !== '') {
                skill.name = `${skill.name}: ${skill.option}`;
              }
              return skill;
            })
            .sort((a, b) => a.name.localeCompare(b.name))
        )
      );
  }
}
