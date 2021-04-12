import { Cp2020ArmorLayer } from './../../../models/cp2020character/cp2020-armor-layer';
import { Cp2020ArmorBlock } from './../../../models/cp2020character/cp2020-armor-block';
import { faShieldAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
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

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  @Input()
  armor = new Cp2020ArmorBlock();

  @Output()
  changeArmor = new EventEmitter<Cp2020ArmorBlock>();

  newLayer = new Cp2020ArmorLayer();
  selectedLocation = '';
  spDamage = 0;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  get addDisable(): boolean {
    return (this.newLayer.name === '');
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

  addLayer() {
    if (!this.addDisable) {
      this.armor.addLayer(this.newLayer);
      this.newLayer = new Cp2020ArmorLayer();
      this.onChangeArmor();
    }
  }

  removeLayer(index: number) {
    this.armor.removeLayer(this.armor.layers[index]);
    this.onChangeArmor();
  }

  changeActive(index: number) {
    const layer = this.armor.layers[index];
    if (layer.isActive) {
      this.armor.deactivateLayer(layer);
    } else {
      this.armor.activateLayer(layer);
    }
    this.onChangeArmor();
  }

  damage() {
    this.armor.damageSP(this.selectedLocation, this.spDamage);
    this.onChangeArmor();
  }
}
