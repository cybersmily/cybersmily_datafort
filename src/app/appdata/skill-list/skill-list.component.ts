import { SeoService } from './../../shared/services/seo/seo.service';
import { SourceBookLookup } from './../../shared/models/source-book-lookup';
import { DataSkill } from './../../shared/models/data/data-skill';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  skillList: DataSkill[] = new Array<DataSkill>();
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
    this.dataService
    .GetJson('/json/apps/cpskills.json')
    .subscribe( data => {
      this.skillList = data.sort( (a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    });
  }

  getSource(skill: DataSkill): string {
    const book = SourceBookLookup.getSource(skill.source);
    return `${book} pg. ${skill.page}`;
  }

}
