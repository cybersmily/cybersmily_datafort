import { ArmorGeneratorService } from './../services/armor-generator/armor-generator.service';
import { ArmorCostCalculatorService,
  ArmorDataAttributesService } from './../services';

import { DiceService } from './../../../services/dice/dice.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Cp2020ArmorPiece, ArmorSpChartEntry, Cp2020ArmorAttributeLists, ArmorOption, CP2020ArmorRandomSettings } from './../models';

@Component({
  selector: 'cs-cp2020-armor-detail',
  templateUrl: './cp2020-armor-detail.component.html',
  styleUrls: ['./cp2020-armor-detail.component.css']
})
export class Cp2020ArmorDetailComponent implements OnInit, OnChanges {
  faDice = faDice;

  currArmor = new Cp2020ArmorPiece();
  armorAttributes = new Cp2020ArmorAttributeLists();
  spValues = new Array<ArmorSpChartEntry>();


  // piece of clothes
  @Input()
  armor = new Cp2020ArmorPiece();

  @Input()
  settings = new CP2020ArmorRandomSettings();

  @Output()
  change = new EventEmitter<Cp2020ArmorPiece>();

  get selectedSP(): ArmorSpChartEntry {
    return this.spValues.filter(sp => sp.sp === this.currArmor.baseSP)[0];
  }

  set selectedSP(value: ArmorSpChartEntry) {
    this.currArmor.baseSP = value.sp;
    this.currArmor.ev = value.ev[this.currArmor.clothes.wt] ?? 0;
    this.update();
  }

  constructor(private dice: DiceService,
    private armorDataAttributesService: ArmorDataAttributesService,
    private costCalculatorService: ArmorCostCalculatorService,
    private armorGeneratorService: ArmorGeneratorService) { }

  ngOnInit() {
    this.currArmor = new Cp2020ArmorPiece(this.armor);
    this.armorDataAttributesService.getData()
    .subscribe( data => {
      this.armorAttributes = new Cp2020ArmorAttributeLists(data);
    });
  }

  ngOnChanges() {
    console.log('onChange', this.currArmor);
    this.currArmor = new Cp2020ArmorPiece(this.armor);
  }

  getOptionValue(optionName: string) {
    return this.currArmor.options.some(opt => opt.name === optionName);
  }

  changeClothing() {
    this.spValues = this.armorAttributes.armorChart.filter( sp => sp.mod[this.currArmor.clothes.wt] !== undefined);
    if(this.currArmor.name === '') {
      this.currArmor.name = this.currArmor.clothes.name;
    }
    this.update();
  }

  changeOption(event, option: ArmorOption) {
    const index = this.currArmor.options.findIndex(opt => opt.name === option.name);
    if (index > -1 && !event.target.checked) {
      this.currArmor.options.splice(index, 1);
    } else if(event.target.checked){
      this.currArmor.options.push(option);
    }
    this.update();
  }

  generate() {
    console.log('generate - start', this.currArmor);
    this.currArmor = this.armorGeneratorService.generate(this.settings, this.dice, this.armorAttributes);
    console.log('generated', this.currArmor);
    this.spValues = this.armorAttributes.armorChart.filter( sp => sp.mod[this.currArmor.clothes.wt] !== undefined);
    const style = this.currArmor.style.name;
    const quality = this.currArmor.quality.name;
    const armored = this.currArmor.baseSP > 0 ? `Armored ` : '';
    const leather = this.currArmor.isLeather ? 'Leather ' : '';
    const type =  this.currArmor.clothes.name;
    this.currArmor.name = `${style} ${quality} ${armored}${leather}${type}`;
    this.update();
    console.log('generate', this.currArmor);
  }

  update() {
    this.currArmor.cost = this.costCalculatorService.calculateCost(this.currArmor, this.armorAttributes.armorChart);
    this.change.emit(this.currArmor);
  }

}
