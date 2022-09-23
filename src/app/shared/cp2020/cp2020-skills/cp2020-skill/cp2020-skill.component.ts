import { Cp2020SkillUpdate } from './../models/cp2020-skill-update';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  Cp2020Stat,
  StatModifier,
} from './../../cp2020-stats/models/cp2020-stat';
import { FumbleChart } from './../models';
import { DiceService } from './../../../services/dice/dice.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Cp2020PlayerSkill, MartialBonuses } from '../models';
import {
  faDice,
  faTrash,
  faPen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp2020-skill',
  templateUrl: './cp2020-skill.component.html',
  styleUrls: ['./cp2020-skill.component.css'],
})
export class Cp2020SkillComponent implements OnInit, OnChanges {
  modalRef: BsModalRef;
  dieRoll = 0;
  totalRoll = 0;
  rollMessage = '';
  faDice = faDice;
  faTrash = faTrash;
  faPen = faPen;
  faPlus = faPlus;

  @Input()
  skill = new Cp2020PlayerSkill();
  currSkill = new Cp2020PlayerSkill();

  @Input()
  stat = new Cp2020Stat();

  @Input()
  sa = false;

  @Output()
  changeSkill = new EventEmitter<Cp2020SkillUpdate>();

  @Output()
  delete = new EventEmitter<Cp2020PlayerSkill>();

  @ViewChild('skillNameElem', { static: false })
  skillNameInput: ElementRef;

  get modifierTotal(): number {
    return this.currSkill.modifiers
      ? this.currSkill.modifiers.reduce((a, b) => a + b.mod, 0)
      : 0;
  }

  constructor(
    private modalService: BsModalService,
    private dice: DiceService
  ) {}

  ngOnInit() {
    this.currSkill = new Cp2020PlayerSkill(this.skill);
    if (this.currSkill.isSecondarySkill) {
    }
  }
  ngOnChanges() {}

  onChangeSkill() {
    this.changeSkill.emit(new Cp2020SkillUpdate(this.skill, this.currSkill));
  }

  updateSkill(skillUpdate: Cp2020SkillUpdate): void {
    this.currSkill = new Cp2020PlayerSkill(skillUpdate.update);
  }

  onClick(template: TemplateRef<any>) {
    let roll = 0;
    this.rollMessage = '';
    this.dieRoll = 0;
    do {
      roll = this.dice.generateNumber(1, 10);
      this.dieRoll += roll;
    } while (roll > 9);
    if (this.dieRoll < 2) {
      this.rollMessage = 'FUMBLE! ';
      this.rollMessage += FumbleChart.getResults(
        this.dice.generateNumber(1, 10),
        this.currSkill
      );
    }
    if (this.dieRoll > 10) {
      this.rollMessage = 'CRITICAL SUCCESS!';
    }
    this.totalRoll =
      this.dieRoll +
      this.currSkill.value +
      (this.stat ? this.stat.Adjusted : 0) +
      this.modifierTotal;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }

  showModal(template: TemplateRef<any>, returnFocus?: string) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.onHide.subscribe((event) => {
      this.onChangeSkill();
    });
    if (returnFocus) {
      this.modalRef.onHidden.subscribe(() => {
        switch (returnFocus) {
          case 'skillName':
            this.skillNameInput.nativeElement.focus();
            break;
        }
      });
    }
  }

  deleteSkill() {
    const retVal = confirm('Are you sure you want to delete the skill?');
    if (retVal === true) {
      this.modalRef.hide();
      this.delete.emit(this.currSkill);
    }
  }
}
