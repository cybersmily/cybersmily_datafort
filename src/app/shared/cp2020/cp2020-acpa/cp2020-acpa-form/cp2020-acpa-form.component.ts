import { Cp2020AcpaArmor } from './../models/cp2020-acpa-armor';
import { Cp2020ACPAChassis } from './../models/cp2020-acpa-chassis';
import { Cp2020ACPABuilderService } from './../services/cp2020-acpa-builder/cp2020-acpa-builder.service';
import { Cp2020ACPA, ACPA } from './../models';
import { Cp2020ACPADataAttributesService } from './../services/cp2020-acpa-data-attrbutes/cp2020-acpa-data-attributes.service';
import { AcpaAttributeData } from './../models/acpa-attribute-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp2020-acpa-form',
  templateUrl: './cp2020-acpa-form.component.html',
  styleUrls: ['./cp2020-acpa-form.component.css']
})
export class Cp2020AcpaFormComponent implements OnInit {
  attributeData: AcpaAttributeData = {
    chassis: [],
    armor: [],
    components: [],
    weapons: []
  }

  currACPA = new Cp2020ACPA();
  selectedChassis = new Cp2020ACPAChassis();
  selectedArmor = new Cp2020AcpaArmor();

  get filteredArmor(): Array<Cp2020AcpaArmor> {
    return this.attributeData.armor.filter(armor => armor.sp < (this.selectedChassis.str * 2));
  }

  constructor(private attributesService: Cp2020ACPADataAttributesService,
    private acpaBuilderService:Cp2020ACPABuilderService
    ) { }

  ngOnInit(): void {
    this.attributesService.getData().subscribe( data => {
      this.attributeData = data;
    });
    this.acpaBuilderService.acpa.subscribe((acpa:ACPA ) => {
      this.currACPA = new Cp2020ACPA(acpa);
    });
  }

  updateChassis() {
    this.currACPA.chassis = new Cp2020ACPAChassis(this.selectedChassis);
    this.update();
  }

  updateArmor() {
    this.currACPA.armor = new Cp2020AcpaArmor(this.selectedArmor);
    this.update();
  }

  update() {
    this.acpaBuilderService.update(this.currACPA);
  }

}
