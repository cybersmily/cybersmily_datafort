import { Cp2020StatBlock } from './../../cp2020-stats/models/cp2020-stat-block';
import { WeaponDataService } from './../services';
import { DiceService } from './../../../services/dice/dice.service';
import { CpPlayerWeaponList, CpPlayerWeapon } from './../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faDice, faPlus, faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkills } from './../../../models/cp2020character';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-cp2020weapontable',
  templateUrl: './cp2020weapontable.component.html',
  styleUrls: ['./cp2020weapontable.component.css']
})
export class Cp2020weapontableComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;
  faCrosshairs = faCrosshairs;

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

  @Input()
  showCalculator = false;

  @Output()
  changeWeapons: EventEmitter<CpPlayerWeaponList> = new EventEmitter<CpPlayerWeaponList>();

  constructor(private modalService: BsModalService, private diceService: DiceService, private weaponData: WeaponDataService) { }

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

  randomGenerateWeapon() {
    this.weaponData.WeaponList.subscribe(data => {
      const shortList = data.filter(
        (weapon) =>
          !weapon.category.toLowerCase().startsWith('machine') &&
          weapon.avail &&
          (weapon.avail.toLowerCase() === 'e' ||
            weapon.avail.toLowerCase() === 'c')
      );
      this.weapons.generateWeapon(shortList, this.diceService);
    this.changeWeapons.emit(this.weapons);
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

}
