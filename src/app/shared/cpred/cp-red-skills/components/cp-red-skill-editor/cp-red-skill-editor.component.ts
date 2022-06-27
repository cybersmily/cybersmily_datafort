import { Observable } from 'rxjs';
import { CpRedSkillDataService } from './../../services/cp-red-skill-data/cp-red-skill-data.service';
import { CpRedCharacterSkill } from './../../models/cp-red-character-skill';
import { Component, Input, OnInit } from '@angular/core';
import { faCheckCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp-red-skill-editor',
  templateUrl: './cp-red-skill-editor.component.html',
  styleUrls: ['./cp-red-skill-editor.component.css'],
})
export class CpRedSkillEditorComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faDotCircle = faDotCircle;

  currSkill: CpRedCharacterSkill = new CpRedCharacterSkill();
  skillStats$: Observable<Array<string>>;
  skillTypes$: Observable<Array<string>>;

  @Input()
  skill: CpRedCharacterSkill = new CpRedCharacterSkill();

  constructor(private skillDataService: CpRedSkillDataService) {}

  get skillModifierTotal(): number {
    return this.currSkill.modifiers.reduce(
      (total, mod) => total + (mod.active ? mod.value : 0),
      0
    );
  }

  get ipRequired(): number {
    if (this.currSkill.base < 10) {
      return (this.currSkill.base + 1) * 20 * this.currSkill.ipMod;
    }
    return null;
  }

  toggleChipped(event) {
    event.stopPropagation();
    this.currSkill.isChipped = !this.currSkill.isChipped;
    return false;
  }

  ngOnInit(): void {
    this.currSkill = { ...this.skill };
    this.skillTypes$ = this.skillDataService.skillTypes;
    this.skillStats$ = this.skillDataService.skillStats;
  }
}
