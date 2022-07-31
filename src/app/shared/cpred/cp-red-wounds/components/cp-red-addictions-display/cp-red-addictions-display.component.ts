import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CpRedCharacterAddiction } from '../../models';

@Component({
  selector: 'cs-cp-red-addictions-display',
  templateUrl: './cp-red-addictions-display.component.html',
  styleUrls: ['./cp-red-addictions-display.component.css'],
})
export class CpRedAddictionsDisplayComponent implements OnInit {
  faPlus = faPlus;

  @Input()
  addictions: Array<CpRedCharacterAddiction>;

  @Output()
  updateAddictions: EventEmitter<Array<CpRedCharacterAddiction>> =
    new EventEmitter<Array<CpRedCharacterAddiction>>();

  constructor() {}

  ngOnInit(): void {}
}
