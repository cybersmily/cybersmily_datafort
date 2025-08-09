import { CpRedSkillManagerService } from './../../services/cp-red-skill-manager/cp-red-skill-manager.service';
import { CpRedSkillMod } from './../../models/cp-red-skill-mod';
import { Observable, map } from 'rxjs';
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
    standalone: false
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

  @Input()
  showDelete: boolean = false;

  @Output()
  updateSkill: EventEmitter<CpRedCharacterSkill> = new EventEmitter<CpRedCharacterSkill>();

  @Output()
  deleteSkill: EventEmitter<CpRedCharacterSkill> = new EventEmitter<CpRedCharacterSkill>();

  constructor(
    private skillDataService: CpRedSkillDataService,
    private skillManager: CpRedSkillManagerService
  ) {}

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

  delete(): void {
    this.deleteSkill.emit(this.currSkill);
  }

  get disableAddSkillMod$(): Observable<boolean> {
    return this.skillManager
      .hasSkillModifier(this.currSkill.name, this.newMod.name)
      .pipe(
        map(
          (found) =>
            found ||
            !this.newMod.name ||
            this.newMod.name === '' ||
            !this.newMod.value
        )
      );
  }
}
