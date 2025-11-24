import { Cp2020SkillUpdate } from './../models/cp2020-skill-update';
import {
  Cp2020Stat,
  StatModifier,
} from './../../cp2020-stats/models/cp2020-stat';
import { Cp2020PlayerSkill } from './../models/cp2020-player-skill';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MartialBonuses } from '../models';

@Component({
    selector: 'cs-cp2020-skill-editor',
    templateUrl: './cp2020-skill-editor.component.html',
    styleUrls: ['./cp2020-skill-editor.component.css'],
    standalone: false
})
export class Cp2020SkillEditorComponent implements OnInit, AfterViewInit {
  faPlus = faPlus;

  @Input()
  skill: Cp2020PlayerSkill = new Cp2020PlayerSkill();

  @Input()
  stat: Cp2020Stat = new Cp2020Stat();

  @Output()
  updateSkill: EventEmitter<Cp2020SkillUpdate> = new EventEmitter<Cp2020SkillUpdate>();

  @ViewChild('subskillElem', { static: false })
  subskillInput: ElementRef;

  currSkill: Cp2020PlayerSkill = new Cp2020PlayerSkill();
  newModifier: StatModifier = { name: '', mod: 0 };

  get isMA(): boolean {
    return this.currSkill.maBonuses ? true : false;
  }

  get nextLevelIP(): number {
    const ipmode = isNaN(this.currSkill?.ipMod) ? 1 : this.currSkill.ipMod;
    const base = 10 * ipmode;
    if (this.currSkill.value < 1) {
      return base;
    }
    return base * this.currSkill.value;
  }

  get modifierTotal(): number {
    return this.currSkill.modifiers
      ? this.currSkill.modifiers.reduce((a, b) => a + b.mod, 0)
      : 0;
  }

  constructor() {}

  ngOnInit(): void {
    this.currSkill = new Cp2020PlayerSkill(this.skill);
  }

  ngAfterViewInit(): void {
    this.subskillInput.nativeElement.focus();
  }

  addModifier() {
    if (!this.currSkill.modifiers) {
      this.currSkill.modifiers = new Array<StatModifier>();
    }
    this.currSkill.modifiers.push({
      name: this.newModifier.name,
      mod: this.newModifier.mod,
    });
    this.updateSkill.emit(new Cp2020SkillUpdate(this.skill, this.currSkill));
    this.newModifier = { name: '', mod: 0 };
  }

  toggleMA() {
    if (this.currSkill.maBonuses) {
      this.currSkill.maBonuses = undefined;
    } else {
      this.currSkill.maBonuses = new MartialBonuses();
    }
  }

  onChangeSkill() {
    this.updateSkill.emit(
      new Cp2020SkillUpdate(
        new Cp2020PlayerSkill(this.skill),
        new Cp2020PlayerSkill(this.currSkill)
      )
    );
  }
}
