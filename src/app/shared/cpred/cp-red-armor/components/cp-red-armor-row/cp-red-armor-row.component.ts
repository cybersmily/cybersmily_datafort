import { CprCharacterArmorSection } from './../../models/cpr-character-armor-section';
import { Component, Input, OnInit } from '@angular/core';
import { faPen, faWrench, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp-red-armor-row',
  templateUrl: './cp-red-armor-row.component.html',
  styleUrls: ['./cp-red-armor-row.component.css'],
})
export class CpRedArmorRowComponent implements OnInit {
  faPen = faPen;
  faMinus = faMinus;
  faWrench = faWrench;

  @Input()
  armorSection: CprCharacterArmorSection = new CprCharacterArmorSection();

  constructor() {}

  ngOnInit(): void {}
}
