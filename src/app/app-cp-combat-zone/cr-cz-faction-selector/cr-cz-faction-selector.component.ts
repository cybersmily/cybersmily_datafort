import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CRCZ_FACTIONS } from '../models/cr-cz-types';

@Component({
    selector: 'cs-cr-cz-faction-selector',
    templateUrl: './cr-cz-faction-selector.component.html',
    styleUrls: ['./cr-cz-faction-selector.component.css'],
    standalone: false
})
export class CrCzFactionSelectorComponent implements OnInit {

  @Input()
  selectedFaction: string;

  @Input()
  hiddenFactions: Array<string>;

  @Output()
  selected: EventEmitter<string> = new EventEmitter<string>();

  factionList: Array<string> = CRCZ_FACTIONS;

  ngOnInit(): void {
    if(this.hiddenFactions) {
      this.factionList = this.factionList.filter(faction => !this.hiddenFactions.includes(faction))
    }
  }

  selectFaction(faction: string): void {
    faction = faction === 'all' ? '' : faction;
    this.selected.emit(faction);
  }

}
