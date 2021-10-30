import { Cp2020SDP } from '../models/cp2020-sdp';
import { DiceService } from './../../../services/dice/dice.service';
import { ArmorDataListService } from '../services/armor-data-list/armor-data-list.service';
import { Cp2020ArmorPiece, Cp2020ArmorBlock } from './../models';
import { faShieldAlt, faPlus, faTrash, faDice, faPen } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cs-cp2020-armor-table',
  templateUrl: './cp2020-armor-table.component.html',
  styleUrls: ['./cp2020-armor-table.component.css']
})
export class Cp2020ArmorTableComponent implements OnInit {
  faShieldAlt = faShieldAlt;
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
  faDice = faDice;

  locations: Array<string> = ['head','torso', 'rarm', 'larm', 'rleg', 'lleg'];

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  @Input()
  armor = new Cp2020ArmorBlock();

  @Input()
  showRandom = false;

  @Output()
  changeArmor = new EventEmitter<Cp2020ArmorBlock>();

  newLayer = new Cp2020ArmorPiece();
  selectedLocation = '';
  spDamage = 0;

  getSDPStyle(sdp: Cp2020SDP): string {
    if(sdp.destroyed !== 0 && sdp.curr >= sdp.destroyed){
      return ' chargen-sdp-dest';
    } else if(sdp.damaged !== 0 && sdp.curr >= sdp.damaged ) {
      return ' chargen-sdp-dmg';
    }
    return '';
  }
  getSDPStatus(sdp: Cp2020SDP): string {
    if(sdp.destroyed !== 0 && sdp.curr >= sdp.destroyed){
      return 'Destroyed!!';
    } else if(sdp.damaged !== 0 && sdp.curr >= sdp.damaged ) {
      return 'Impaired';
    }
    return '';
  }

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  onChangeArmor() {
    this.changeArmor.emit(this.armor);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

  damage() {
    this.armor.damageSP(this.selectedLocation, this.spDamage);
    this.onChangeArmor();
  }

  resetSDP(location: string) {
    this.armor.sdp[location] = { curr: 0, damaged: 0, destroyed: 0};
    this.onChangeArmor();
  }
}
