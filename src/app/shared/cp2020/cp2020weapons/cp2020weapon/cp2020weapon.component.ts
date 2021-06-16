import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Cp2020PlayerSkill } from './../../../cp2020/cp2020-skills/models';
import { DiceService } from './../../../services/dice/dice.service';
import { faPen, faTrash, faDice, faRedo } from '@fortawesome/free-solid-svg-icons';
import { CpPlayerWeapon } from './../models';
import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020weapon',
  templateUrl: './cp2020weapon.component.html',
  styleUrls: ['./cp2020weapon.component.css']
})
export class Cp2020weaponComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  faDice = faDice;
  faRedo = faRedo;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  @Input()
  weapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Input()
  skill: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  @Input()
  Ref = 0;

  @Input()
  BodDamageMod = 0;

  @Input()
  index: number;

  @Output()
  updateWeapon: EventEmitter<{index: number, weapon: CpPlayerWeapon}> = new EventEmitter<{index: number, weapon: CpPlayerWeapon}>();

  @Output()
  deleteWeapon: EventEmitter<number> = new EventEmitter<number>();

  reliabilityResults = '';
  damageRoll = '';
  selectedSkill: Cp2020PlayerSkill;
  toHitOutcome = '';

  constructor(private diceService: DiceService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.selectedSkill = (this.skill.length === 1) ? this.skill[0] : new Cp2020PlayerSkill();
  }

  rollReliability() {
    this.reliabilityResults = this.weapon.checkReliability(this.diceService);
  }


  rollDamage() {
    this.damageRoll = this.weapon.rollDamage(this.diceService, 1, this.BodDamageMod).join('<br>');
  }

  rollToHit() {
    this.toHitOutcome = '';
    this.toHitOutcome = this.weapon.fire(this.diceService, this.Ref, this.selectedSkill.value);
  }

  reload() {
    this.weapon.reload();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

  update(wpn: CpPlayerWeapon) {
    this.weapon = wpn;
    this.updateWeapon.emit({index: this.index, weapon: this.weapon});
  }

  delete() {
    this.deleteWeapon.emit(this.index);
  }

}
