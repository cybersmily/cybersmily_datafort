import { faTrash, faPlus, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cp2020ArmorBlock } from './../../shared/models/cp2020character';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Cp2020ArmorLayer } from './../../shared/models/cp2020character/cp2020-armor-layer';

@Component({
  selector: 'cs-app-character-armor',
  templateUrl: './app-character-armor.component.html',
  styleUrls: ['./app-character-armor.component.css']
})
export class AppCharacterArmorComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;
  faShieldAlt = faShieldAlt;

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
