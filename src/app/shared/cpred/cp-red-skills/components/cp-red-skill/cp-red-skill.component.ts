import { CpRedSkillManagerService } from './../../services/cp-red-skill-manager/cp-red-skill-manager.service';
import { DiceService } from './../../../../services/dice/dice.service';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { faDice, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { CpRedStatsManagerService } from './../../../c-p-red-stats/services/cp-red-stats-manager/cp-red-stats-manager.service';
import { CpRedCharacterSkill } from './../../models/cp-red-character-skill';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  OnChanges,
} from '@angular/core';
import { CpRedCharacterStat } from '../../../c-p-red-stats/models';

@Component({
  selector: 'cs-cp-red-skill',
  templateUrl: './cp-red-skill.component.html',
  styleUrls: ['./cp-red-skill.component.css'],
})
export class CpRedSkillComponent implements OnInit, OnChanges {
  faDice = faDice;
  faTimes = faTimes;

  modalRef: BsModalRef;
  modalConfig: ModalOptions = {};

  @Input()
  skill: CpRedCharacterSkill = new CpRedCharacterSkill();

  currSkill: CpRedCharacterSkill = new CpRedCharacterSkill();

  @Input()
  index: number = 0;

  @Input()
  showStat: boolean = false;

  @Input()
  showType: boolean = false;

  stat$: Observable<CpRedCharacterStat>;

  constructor(
    private statManager: CpRedStatsManagerService,
    private skillsManager: CpRedSkillManagerService,
    private modalService: BsModalService,
    private dice: DiceService
  ) {}

  ngOnInit(): void {
    this.stat$ = this.statManager.getStat(this.skill.stat);
    this.currSkill = new CpRedCharacterSkill(this.skill);
  }

  ngOnChanges(): void {}

  showModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  closeDropdown(): void {
    this.changeSkill();
  }

  updateSkill(skill: CpRedCharacterSkill): void {
    this.currSkill = new CpRedCharacterSkill(skill);
  }

  changeSkill(): void {
    this.skillsManager.updateSkill(this.skill.name, this.currSkill);
  }
}
