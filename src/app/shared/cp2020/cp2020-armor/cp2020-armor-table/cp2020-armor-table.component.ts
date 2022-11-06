import { Cp2020DamageCalculatorService } from './../services/cp2020-damage-calculator/cp2020-damage-calculator.service';
import { Cp2020AmmoTypes } from './../enums/cp2020-ammo-types';
import { Cp2020SDP } from '../models/cp2020-sdp';
import { DiceService } from './../../../services/dice/dice.service';
import { ArmorDataListService } from '../services/armor-data-list/armor-data-list.service';
import { Cp2020ArmorPiece, Cp2020ArmorBlock } from './../models';
import {
  faShieldAlt,
  faPlus,
  faTrash,
  faDice,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cs-cp2020-armor-table',
  templateUrl: './cp2020-armor-table.component.html',
  styleUrls: ['./cp2020-armor-table.component.css'],
})
export class Cp2020ArmorTableComponent implements OnInit {
  faShieldAlt = faShieldAlt;
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
  faDice = faDice;

  locations: Array<string> = ['head', 'torso', 'rarm', 'larm', 'rleg', 'lleg'];

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-right modal-lg',
  };

  @Input()
  armor = new Cp2020ArmorBlock();

  @Input()
  showRandom = false;

  @Output()
  changeArmor = new EventEmitter<Cp2020ArmorBlock>();

  @Output()
  damageCharacter = new EventEmitter<number>();

  newLayer = new Cp2020ArmorPiece();
  selectedLocation = '';
  spDamage = 1;
  damage = 0;
  damageType = Cp2020AmmoTypes.NORMAL_ROUND;

  destroyedPopover = 'Damage to make the limb destroyed.';
  impairedPopover = 'Damage to make the limb impaired.';
  currentPopover = 'Current SDP damage to the limb.';

  getSDPStyle(sdp: Cp2020SDP): string {
    if (sdp.destroyed !== 0 && sdp.curr >= sdp.destroyed) {
      return ' chargen-sdp-dest';
    } else if (sdp.damaged !== 0 && sdp.curr >= sdp.damaged) {
      return ' chargen-sdp-dmg';
    }
    return '';
  }

  getSDPStatus(sdp: Cp2020SDP): string {
    if (sdp.destroyed !== 0 && sdp.curr >= sdp.destroyed) {
      return 'Destroyed!!';
    } else if (sdp.damaged !== 0 && sdp.curr >= sdp.damaged) {
      return 'Impaired';
    }
    return '';
  }

  constructor(
    private modalService: BsModalService,
    private damageCalculatorService: Cp2020DamageCalculatorService
  ) {}

  ngOnInit() {}

  onChangeArmor() {
    this.changeArmor.emit(this.armor);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

  applyDamage() {
    const isHard = this.armor.hasHardLayer(this.selectedLocation);
    let sp = 0;
    switch (this.selectedLocation) {
      case 'head':
        sp = this.armor.headSP;
        break;
      case 'rarm':
        sp = this.armor.rArmSP;
        break;
      case 'larm':
        sp = this.armor.lArmSP;
        break;
      case 'rleg':
        sp = this.armor.rLegSP;
        break;
      case 'lleg':
        sp = this.armor.lLegSP;
        break;
      default:
        sp = this.armor.torsoSP;
    }
    const dmg = this.damageCalculatorService.getWounds(
      this.damage,
      this.damageType,
      this.selectedLocation,
      sp,
      isHard
    );
    if (dmg > 0) {
      this.armor.damageSP(this.selectedLocation, this.spDamage);
    }
    if (
      this.armor.sdp[this.selectedLocation]?.damaged > 0 ||
      this.armor.sdp[this.selectedLocation]?.destroyed > 0
    ) {
      this.armor.sdp[this.selectedLocation].curr += dmg;
      this.armor.sdp[this.selectedLocation].curr =
        this.armor.sdp[this.selectedLocation].curr < 0
          ? 0
          : this.armor.sdp[this.selectedLocation].curr;
    } else {
      this.damageCharacter.emit(dmg);
    }
  }

  damageSP() {
    this.armor.damageSP(this.selectedLocation, this.spDamage);
    this.onChangeArmor();
  }

  resetSDP(location: string) {
    this.armor.sdp[location] = { curr: 0, damaged: 0, destroyed: 0 };
    this.onChangeArmor();
  }
}
