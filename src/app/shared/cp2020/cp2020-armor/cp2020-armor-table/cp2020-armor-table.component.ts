import { DiceService } from './../../../services/dice/dice.service';
import { ArmorDataService } from './../services/armor-data.service';
import { Cp2020ArmorLayer } from './../models';
import { Cp2020ArmorBlock } from './../models';
import { faShieldAlt, faPlus, faTrash, faDice } from '@fortawesome/free-solid-svg-icons';
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
  faDice = faDice;

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

  newLayer = new Cp2020ArmorLayer();
  selectedLocation = '';
  spDamage = 0;

  constructor(private modalService: BsModalService,
    private armorService: ArmorDataService,
    private diceService: DiceService) { }

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

  generate() {
    this.armorService.generateArmorLayer(this.diceService)
    .subscribe( layer => {
      this.armor.addLayer(layer);
      this.onChangeArmor();
    });
  }
}
