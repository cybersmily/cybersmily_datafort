import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { SourceBookLookup } from './../../shared/models/source-book-lookup';
import { DataSkill } from '../../shared/cp2020/cp2020-skills/models/data-skill';
import { DataService, JsonDataFiles } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  skillList$: Observable<Array<DataSkill>>;
  filters = {
    name: '',
    stat: '',
    sa: '',
    source: '',
    get searchSpclAbility(): boolean {
      return (this.sa.toLowerCase().includes('y')) ? true : (this.sa.toLowerCase().includes('n')) ? false : undefined;
    }
  };

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Skill List',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Skill List is a complied list of skills from Cyberpunk 2020 source books.'
    );
    this.skillList$ = this.dataService
    .GetJson(JsonDataFiles.CP2020_SKILLS_DATA_LIST_JSON)
    .pipe( map( data => data.sort((a,b) => a.name.localeCompare(b.name))));
  }

  getSource(skill: DataSkill): string {
    const book = SourceBookLookup.getSource(skill.source);
    return `${book} pg. ${skill.page}`;
  }

}
