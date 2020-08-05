import { CmbtTrckOppChartService } from './../services/cmbt-trck-opp-chart.service';
import { Cp2020ArmorLayer, Cp2020ArmorBlock } from './../../shared/models/cp2020character';
import { ArmorLayer } from '../../shared/models/armor';
import { faPlus, faTrash, faDice } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-armor',
  templateUrl: './cmbt-trck-armor.component.html',
  styleUrls: ['./cmbt-trck-armor.component.css']
})
export class CmbtTrckArmorComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faDice = faDice;

  @Input()
  armorBlock: Cp2020ArmorBlock = new Cp2020ArmorBlock();

  @Output()
  changeArmorBlock = new EventEmitter<Cp2020ArmorBlock>();

  newArmorLayer: ArmorLayer = new Cp2020ArmorLayer();

  constructor(private oppCharts: CmbtTrckOppChartService) { }

  ngOnInit() {
  }

  addLayer() {
    this.armorBlock.addLayer(this.newArmorLayer);
    this.newArmorLayer = new Cp2020ArmorLayer();
    this.updateArmorBlock();
  }

  removeLayer(index: number) {
    const layer = this.armorBlock.layers[index];
    this.armorBlock.removeLayer(layer);
    this.updateArmorBlock();
  }

  activateLayer(index: number) {
    const layer = this.armorBlock.layers[index];
    this.armorBlock.activateLayer(layer);
    this.updateArmorBlock();
  }

  updateArmorBlock() {
    this.changeArmorBlock.emit(this.armorBlock);
  }

  generate() {
    this.oppCharts.generateArmor()
    .subscribe( item => {
      if (item) {
        const layer = new Cp2020ArmorLayer(item.armor);
        layer.name = item.name;
        layer.isActive = true;
        this.armorBlock.addLayer(layer);
        this.updateArmorBlock();
      }
    });
  }

}
