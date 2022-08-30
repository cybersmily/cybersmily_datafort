import { Cp2020ACPAWeapon } from './../../models/cp2020-acpa-weapon';
import { Cp2020ACPAComponent } from './../../models/cp2020-acpa-component';
import { map } from 'rxjs/operators';
import { Cp2020ACPABuilderService } from './../../services/cp2020-acpa-builder/cp2020-acpa-builder.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-cp2020-acpa-carried-editor',
  templateUrl: './cp2020-acpa-carried-editor.component.html',
  styleUrls: ['./cp2020-acpa-carried-editor.component.css'],
})
export class Cp2020AcpaCarriedEditorComponent implements OnInit {
  carriedEquipment$: Observable<Array<any>>;

  @Input()
  isDisabled: boolean = false;

  constructor(private acpaBuilderService: Cp2020ACPABuilderService) {}

  ngOnInit(): void {
    this.carriedEquipment$ = this.acpaBuilderService.acpa.pipe(
      map((acpa) => acpa.equipment)
    );
  }

  removeCarriedComponent(index: number) {
    this.acpaBuilderService.removeCarriedEquipment(index);
  }

  showCarriedComponent(
    location: string,
    availableSpaces: number,
    template: TemplateRef<any>
  ) {
    // this.installableComponents = this.attributeData.components.filter(
    //   (item) => item.spaces === 0
    // );
    // this.installableWeapons = this.attributeData.weapons;
    // this.showEquipment(
    //   location,
    //   availableSpaces,
    //   ACPAEnclosure.carried,
    //   template
    // );
  }

  getEquipmentColumnOne(
    equipment: Array<any>
  ): Array<Cp2020ACPAComponent | Cp2020ACPAWeapon> {
    const count = Math.ceil(equipment.length / 2);
    return equipment.slice(0, count);
  }

  getEquipmentColumnTwo(
    equipment: Array<any>
  ): Array<Cp2020ACPAComponent | Cp2020ACPAWeapon> {
    const count = Math.ceil(equipment.length / 2);
    return equipment.slice(count);
  }
}
