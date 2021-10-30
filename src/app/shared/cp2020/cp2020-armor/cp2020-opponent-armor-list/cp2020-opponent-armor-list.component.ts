import { Cp2020ArmorPiece } from '../models/cp2020-armor-piece';
import { faWrench, faTrash, faPlus, faDice, faSave } from '@fortawesome/free-solid-svg-icons';
import { Cp2020ArmorBlock } from '../models/cp2020-armor-block';
import { Component, Input, OnInit, Output, TemplateRef, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cs-cp2020-opponent-armor-list',
  templateUrl: './cp2020-opponent-armor-list.component.html',
  styleUrls: ['./cp2020-opponent-armor-list.component.css']
})
export class Cp2020OpponentArmorListComponent implements OnInit {
  faWrench = faWrench;
  faTrash = faTrash;
  faPlus = faPlus;
  faDice = faDice;
  faSave = faSave;

  modalRef: BsModalRef;
  config: {};

  @Input()
  armorBlock = new Cp2020ArmorBlock();

  @Output()
  updateAmor = new EventEmitter<Cp2020ArmorBlock>();

  currArmorBlock = new Cp2020ArmorBlock();
  selectedArmor = new Cp2020ArmorPiece();
  selectedIndex = -1;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.currArmorBlock = new Cp2020ArmorBlock(this.armorBlock);
  }

  update() {
    this.updateAmor.emit(this.currArmorBlock);
  }

  repairArmor(armor: Cp2020ArmorPiece) {
    armor.locations = this.currArmorBlock.repairArmorAllLocations(armor.baseSP, armor.locations);
    this.update();
  }

  deleteArmor(index: number) {
    this.currArmorBlock.removePiece(index);
    this.update();
  }

  toggleActiveArmor(event, index: number) {
    if(event.target.checked) {
      this.currArmorBlock.activatePiece(index);
    } else {
      this.currArmorBlock.deactivatePiece(index);
    }
    this.update();
  }

  rollrandom() {}

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeArmorDetailModal() {
    this.selectedArmor = new Cp2020ArmorPiece();
    this.selectedIndex = -1;
    if(this.modalRef) {
      this.modalRef.hide();
    }
  }

  updateSelectedArmor(armor: Cp2020ArmorPiece) {
    this.selectedArmor = new Cp2020ArmorPiece(armor);
  }

  saveNewArmor() {
    this.currArmorBlock.addPiece(this.selectedArmor);
    this.closeArmorDetailModal();
    this.update();
  }


}
