import { FumbleChart } from './../../../models/skill/fumble-chart';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Cp2020PlayerSkill } from './../../../models/cp2020character';
import { DiceService } from './../../../services/dice/dice.service';
import { faPen, faTrash, faDice } from '@fortawesome/free-solid-svg-icons';
import { CpPlayerWeapon } from './../../../models/weapon/cp-player-weapon';
import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'cs-cp2020weapon',
  templateUrl: './cp2020weapon.component.html',
  styleUrls: ['./cp2020weapon.component.css']
})
export class Cp2020weaponComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  faDice = faDice;
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

  weaponShots: Array<boolean>;
  selectShot: number;
  unjammRoll: string;
  jammed = 0;
  damageRoll = '';
  skillRoll = '';
  selectedSkill: Cp2020PlayerSkill;

  constructor(private diceService: DiceService, private modalService: BsModalService) { }

  ngOnInit(): void {
    if (this.weapon.shots && this.weapon.shots > 0) {
      this.weaponShots = new Array<boolean>(this.weapon.shots);
      this.weaponShots.fill(false);
    } else {
      this.weaponShots = undefined;
    }
    this.selectedSkill = (this.skill.length === 1) ? this.skill[0] : new Cp2020PlayerSkill();
  }

  get usedShots(): number {
    return this.weaponShots.reduce( (a, b) => a + (b ? 1 : 0), 0);
  }

  checkShots(index: number) {
    if (this.weaponShots) {
      if ( index === this.selectShot) {
        this.weaponShots[index] = false;
      } else {
        this.selectShot = index;
        this.weaponShots.fill(true, 0, index + 1);
        this.weaponShots.fill(false, index + 1);
      }
    }
  }

  rollReliability() {
    const roll = this.diceService.generateNumber(1, 10);
    this.weapon.checkReliability(roll);
    if (this.weapon.jammed) {
      this.jammed = this.diceService.generateNumber(1, 6);
    }
  }


  rollDamage() {
    const roll = this.diceService.rollMoreDice(this.weapon.damage);
    if (this.weapon.type.toLowerCase() === 'mel') {
      roll.total += this.BodDamageMod;
    }
    this.damageRoll = `${roll.show()}${ this.weapon.type.toLowerCase() === 'mel' ? ' +  ' + this.BodDamageMod + '(BOD Mod)' : ''}`;
  }

  rollToHit() {
    this.skillRoll = this.selectedSkill.value + '(skill) ';
    this.skillRoll += '+ ' + this.Ref + '(REF) ';
    this.skillRoll += ((this.weapon.wa >= 0) ? '+ ' + this.weapon.wa : '') + '(wa) ';
    // this.skillRoll += '+ ' + this.modifiers.totalModifiers + '(mods) ';
    let roll = this.diceService.generateNumber(1, 10);
    let dieRolls = '[ ' + roll;
    let total = roll;
    while ( roll === 10) {
      roll = this.diceService.generateNumber(1, 10);
      total += roll;
      dieRolls += ' ' + roll;
    }
    dieRolls += ' ]';
    this.skillRoll += '+ ' + total + '(dice)' + dieRolls + '<br>';
    if (roll === 1 ) {
      this.skillRoll += 'Fumbled! ' + FumbleChart.getResults(this.diceService.generateNumber(1, 10), undefined);
    }
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
