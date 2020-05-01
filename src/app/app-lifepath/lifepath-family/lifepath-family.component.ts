import { FamilyGeneratorService } from '../../shared/services/lifepath/family-generator.service';
import {
  FamilyChart, Sibling, LifepathFamily, LifepahtParentOption, Siblings
} from '../../shared/models/lifepath';
import {
  DiceService
} from './../../shared/services/dice/dice.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-lifepath-family',
  templateUrl: './lifepath-family.component.html',
  styleUrls: ['./lifepath-family.component.css']
})
export class LifepathFamilyComponent implements OnInit {

  @Input()
  lifepathSource: string;

  @Output()
  generateValue = new EventEmitter();

  GeneratedFamily: LifepathFamily;

  constructor(private familyGenService: FamilyGeneratorService) {
  }

  ngOnInit() {
    this.GeneratedFamily = new LifepathFamily();
    this.lifepathSource = 'CP2020';
  }
  generateFamily() {
    if (this.lifepathSource !== '') {
      this.familyGenService
      .GenerateFamily(this.lifepathSource).subscribe( data => {
        this.GeneratedFamily = data;
        this.onGenerate(this.GeneratedFamily);
      });
    }
  }

onGenerate(family: LifepathFamily) {
  this.generateValue.emit(family);
}
}
