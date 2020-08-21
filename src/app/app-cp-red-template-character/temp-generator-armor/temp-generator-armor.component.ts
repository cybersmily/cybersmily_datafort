import { CpRedTemplateArmor } from './../../shared/cpred/models/cp-red-template-armor';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cs-temp-generator-armor',
  templateUrl: './temp-generator-armor.component.html',
  styleUrls: ['./temp-generator-armor.component.css']
})
export class TempGeneratorArmorComponent implements OnInit {
  @Input()
  armor: CpRedTemplateArmor = {name: '', head: 0, body: 0};

  constructor() { }

  ngOnInit() {
  }

}
