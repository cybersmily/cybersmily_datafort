import { Cp2020SkillListSettings } from './../models/cp2020-skill-list-settings';
import { faDice, faChevronDown, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkill, Cp2020PlayerSkills } from './../models';
import { Cp2020StatBlock } from '../../cp2020-stats/models/cp2020-stat-block';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cp2020-skill-list-full',
  templateUrl: './cp2020-skill-list-full.component.html',
  styleUrls: ['./cp2020-skill-list-full.component.css']
})
export class Cp2020SkillListFullComponent implements OnInit, OnChanges {
  faDice = faDice;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faSearch = faSearch;

  get collapseChevron(): any {
    return (this.isCollapsed)? this.faChevronRight : this.faChevronDown;
  }

  @Input()
  stats = new Cp2020StatBlock();

  @Input()
  skills:Cp2020PlayerSkills = new Cp2020PlayerSkills();

  @Input()
  isCollapsed = false;

  @Input()
  skillSettings = new Cp2020SkillListSettings();

  @Output()
  changeSKills = new EventEmitter<Cp2020PlayerSkills>();

  skillTotals = { role: {}, other: {}};
  currentSkills: Cp2020PlayerSkills = new Cp2020PlayerSkills();
  currentSettings = new Cp2020SkillListSettings();
  skillFilter: string = '';

  constructor() {}

  ngOnInit() {
    this.currentSkills = new Cp2020PlayerSkills();
    this.skillSettings.ref = this.stats.REF.Base;
    this.skillSettings.int = this.stats.INT.Base;
    this.currentSettings = new Cp2020SkillListSettings(this.skillSettings);
    this.currentSkills.import(this.skills);
  }

  ngOnChanges() {
    this.currentSkills = new Cp2020PlayerSkills();
    this.skillSettings.ref = this.stats.REF.Base;
    this.skillSettings.int = this.stats.INT.Base;
    this.currentSettings = new Cp2020SkillListSettings(this.skillSettings);
    this.currentSkills.import(this.skills);
  }

  onChangeSkill(skill?:Cp2020PlayerSkill) {
    if(skill) {
      this.currentSkills.editSkill(skill);
    }
    this.changeSKills.emit(this.currentSkills);
  }

  onNewSkill(skill: Cp2020PlayerSkill) {
    this.currentSkills.addSkill(skill);
    this.onChangeSkill();
  }

  onDeleteSkill(skill:Cp2020PlayerSkill) {
    this.currentSkills.deleteSkill(skill);
    this.onChangeSkill();
  }

}
