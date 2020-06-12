import { faPlus, faUndo } from '@fortawesome/free-solid-svg-icons';
import { Cp2020Drug } from './../../shared/models/drug/cp2020-drug';
import { forkJoin } from 'rxjs';
import { CpSelectedDrugEffect } from './../../shared/models/drug/cp-drug';
import { RxLabDataService } from './../../shared/services/rxlab/rx-lab-data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-drug-lab-generator',
  templateUrl: './drug-lab-generator.component.html',
  styleUrls: ['./drug-lab-generator.component.css']
})
export class DrugLabGeneratorComponent implements OnInit {
  faPlus = faPlus;
  faUndo = faUndo;

  effectList: Array<CpSelectedDrugEffect> = new Array<CpSelectedDrugEffect>();
  sideEffectList: Array<CpSelectedDrugEffect> = new Array<CpSelectedDrugEffect>();

  @Input()
  selectedDrug: Cp2020Drug = new Cp2020Drug();

  @Output()
  addDrug: EventEmitter<Cp2020Drug> = new EventEmitter<Cp2020Drug>();

  constructor(private rxLabDataService: RxLabDataService) { }

  ngOnInit() {
    const effectData = this.rxLabDataService.effects;
    const sideEffectData = this.rxLabDataService.sideEffects;
    forkJoin( [
      effectData,
      sideEffectData])
      .subscribe( results => {
      this.effectList = results[0];
      this.sideEffectList = results[1];
    });
  }

  enableEffect(effect: CpSelectedDrugEffect) {
    if (effect.enabled) {
      this.selectedDrug.effects.push(effect);
    } else {
      const i = this.selectedDrug.effects.findIndex( e => e.effect === effect.effect);
      this.selectedDrug.effects.splice(i, 1);
    }
  }

  enableSideEffect(effect: CpSelectedDrugEffect) {
    if (effect.enabled) {
      this.selectedDrug.sideEffects.push(effect);
    } else {
      const i = this.selectedDrug.sideEffects.findIndex( e => e.effect === effect.effect);
      this.selectedDrug.sideEffects.splice(i, 1);
    }
  }

  add() {
    this.addDrug.emit(this.selectedDrug);
  }

}
