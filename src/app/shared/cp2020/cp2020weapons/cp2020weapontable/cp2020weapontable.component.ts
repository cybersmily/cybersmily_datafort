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
  weapons: Array<CpPlayerWeapon> = new Array<CpPlayerWeapon>();

  @Input()
  stats: Cp2020StatBlock = new Cp2020StatBlock();

  @Input()
  skills: Cp2020PlayerSkills = new Cp2020PlayerSkills();

  @Output()
  changeWeapons: EventEmitter<Array<CpPlayerWeapon>> = new EventEmitter<Array<CpPlayerWeapon>>();

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  updateWeapon(data: {index: number, weapon: CpPlayerWeapon}) {
    this.weapons[data.index] = data.weapon;
    this.changeWeapons.emit(this.weapons);
  }

  deleteWeapon(index: number) {
    this.weapons.splice(index, 1);
    this.changeWeapons.emit(this.weapons);
  }

  addWeapon(wpn: CpPlayerWeapon) {
    this.weapons.push(wpn);
    this.changeWeapons.emit(this.weapons);
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

}
