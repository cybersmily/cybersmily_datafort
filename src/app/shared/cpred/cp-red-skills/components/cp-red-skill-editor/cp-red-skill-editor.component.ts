import { CpRedSkillMod } from './../../models/cp-red-skill-mod';
import { Observable } from 'rxjs';
import { CpRedSkillDataService } from './../../services/cp-red-skill-data/cp-red-skill-data.service';
import { CpRedCharacterSkill } from './../../models/cp-red-character-skill';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faCheckCircle,
  faDotCircle,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp-red-skill-editor',
  templateUrl: './cp-red-skill-editor.component.html',
  styleUrls: ['./cp-red-skill-editor.component.css'],
})
export class CpRedSkillEditorComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faDotCircle = faDotCircle;
  faPlus = faPlus;
  faTrash = faTrash;

  currSkill: CpRedCharacterSkill = new CpRedCharacterSkill();
  skillStats$: Observable<Array<string>>;
  skillTypes$: Observable<Array<string>>;
  showModifiers: boolean = false;
  newMod: CpRedSkillMod = { active: true, name: '', value: 0 };

  @Input()
  skill: CpRedCharacterSkill = new CpRedCharacterSkill();

  @Output()
  updateSkill: EventEmitter<CpRedCharacterSkill> = new EventEmitter<CpRedCharacterSkill>();

  constructor(private skillDataService: CpRedSkillDataService) {}

  toggleChipped(event) {
    event.stopPropagation();
    this.currSkill.isChipped = !this.currSkill.isChipped;
    this.update();
    return false;
  }

  ngOnInit(): void {
    this.currSkill = new CpRedCharacterSkill(this.skill);
    this.skillTypes$ = this.skillDataService.skillTypes;
    this.skillStats$ = this.skillDataService.skillStats;
  }

  addModifier(event: Event): void {
    event.stopPropagation();
    this.currSkill.modifiers.push({ ...this.newMod });
    this.newMod = { active: true, name: '', value: 0 };
    this.update();
  }

  deleteModifier(event: Event, index: number): void {
    event.stopPropagation();
    this.currSkill.modifiers.splice(index, 1);
    this.update();
  }

  toggleModifierActivation(event: Event, index: number): void {
    event.stopPropagation();
    this.currSkill.modifiers[index].active =
      !this.currSkill.modifiers[index].active;
    this.update();
  }

  setSkillType(skillType: string): void {
    this.currSkill.type = skillType;
    this.update();
  }

  setSkillStat(stat: string): void {
    this.currSkill.stat = stat;
    this.update();
  }

  update(): void {
    this.updateSkill.emit(this.currSkill);
  }
}
