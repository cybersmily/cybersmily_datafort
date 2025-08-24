import { faSave } from '@fortawesome/free-solid-svg-icons';
import { DataSkill, MartialBonuses } from './../models';
import { Cp2020PlayerSkill } from './../models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SkillListService } from '../services';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'cs-cp2020-skill-new',
    templateUrl: './cp2020-skill-new.component.html',
    styleUrls: ['./cp2020-skill-new.component.css'],
    standalone: false
})
export class Cp2020SkillNewComponent implements OnInit {
  faSave = faSave;

  @Input()
  skill: Cp2020PlayerSkill = new Cp2020PlayerSkill();

  @Input()
  stat: string = '';

  @Output()
  updateSkill: EventEmitter<Cp2020PlayerSkill> = new EventEmitter<Cp2020PlayerSkill>();

  currSkill: Cp2020PlayerSkill;
  skills$: Observable<Array<DataSkill>>;
  skillName?: string;

  isMA: boolean = false;

  newMA: MartialBonuses;

  get skillParents(): Array<string> {
    switch (this.currSkill.stat) {
      case 'int':
        return ['Expert', 'Language'];
      case 'ref':
        return ['Martial Arts', 'Pilot'];
      default:
        return [];
    }
  }

  constructor(private skillListService: SkillListService) {}

  ngOnInit(): void {
    this.currSkill = new Cp2020PlayerSkill(this.skill);
    if (
      !this.stat.toLowerCase().startsWith('special') &&
      this.stat.toLowerCase() !== 'other'
    ) {
      this.currSkill.stat = this.stat.toLowerCase();
    }
    if (this.stat.toLowerCase() === 'other') {
      this.currSkill.name = 'Other';
    }
    this.skills$ = this.skillListService.Skills.pipe(
      map(skills => {
        return skills.filter(sk => {
          const query = new RegExp(this.skillName, 'i');
          return query.test(sk.name);
          }
        );
      })
    );
  }


  update() {
    this.currSkill.name = this.skillName;
    this.updateSkill.emit(this.currSkill);
  }

  toggleMA() {
    if (this.currSkill.maBonuses) {
      this.currSkill.maBonuses = undefined;
    } else {
      this.currSkill.maBonuses = new MartialBonuses();
    }
  }

  typeaheadOnSelect($event) {
    this.currSkill = new Cp2020PlayerSkill($event.item);
    this.skillName = this.currSkill.name;
  }
}
