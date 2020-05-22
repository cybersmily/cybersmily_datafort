import { Cp2020ArmorLayer } from 'src/app/shared/models/cp2020character/cp2020-armor-block';
import { ArmorLayer } from './../../shared/models/gear/armor-layer';
import { Cp2020ArmorBlock } from './../../shared/models/cp2020character/cp2020-armor-block';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-armor',
  templateUrl: './cmbt-trck-armor.component.html',
  styleUrls: ['./cmbt-trck-armor.component.css']
})
export class CmbtTrckArmorComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  @Input()
  armorBlock: Cp2020ArmorBlock = new Cp2020ArmorBlock();

  @Output()
  changeArmorBlock = new EventEmitter<Cp2020ArmorBlock>();

  newArmorLayer: ArmorLayer = new Cp2020ArmorLayer();

  constructor() { }

  ngOnInit() {
  }

  addLayer() {
    this.armorBlock.addLayer(this.newArmorLayer);
    this.changeArmorBlock.emit(this.armorBlock);
  }

  removeLayer(index: number) {
    const layer = this.armorBlock.layers[index];
    this.armorBlock.removeLayer(layer);
    this.changeArmorBlock.emit(this.armorBlock);
  }

  activateLayer(index: number) {
    const layer = this.armorBlock.layers[index];
    this.armorBlock.activateLayer(layer);
    this.changeArmorBlock.emit(this.armorBlock);
  }

}
