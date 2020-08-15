import { CpPlayerWeaponList } from './../../../models/weapon/cp-player-weapon-list';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faDice, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Cp2020StatBlock, Cp2020PlayerSkills } from './../../../models/cp2020character';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CpPlayerWeapon } from './../../../models/weapon';

@Component({
  selector: 'cs-cp2020weapontable',
  templateUrl: './cp2020weapontable.component.html',
  styleUrls: ['./cp2020weapontable.component.css']
})
export class Cp2020weapontableComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;
  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };
  newWeapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Input()
  weapons: CpPlayerWeaponList = new CpPlayerWeaponList();

  @Input()
  stats: Cp2020StatBlock = new Cp2020StatBlock();

  @Input()
  skills: Cp2020PlayerSkills = new Cp2020PlayerSkills();

  @Input()
  showRandomGenerator = false;

  @Input()
  showSelector = false;

  @Output()
  changeWeapons: EventEmitter<CpPlayerWeaponList> = new EventEmitter<CpPlayerWeaponList>();

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  updateWeapon(data: {index: number, weapon: CpPlayerWeapon}) {
    this.weapons.updateWeapon(data.index, data.weapon);
    this.changeWeapons.emit(this.weapons);
  }

  deleteWeapon(index: number) {
    this.weapons.deleteWeapon(index);
    this.changeWeapons.emit(this.weapons);
  }

  addWeapon(wpn: CpPlayerWeapon) {
    this.weapons.addWeapon(wpn);
    this.changeWeapons.emit(this.weapons);
  }

  addWeaponList(wpnList: Array<CpPlayerWeapon>) {
    this.weapons.addPlayerWeaponList(wpnList);
    this.changeWeapons.emit(this.weapons);
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

}
