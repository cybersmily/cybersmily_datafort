import { JsonDataFiles } from './../../../services/file-services/json-data-files';
import { DataService } from './../../../services/file-services/data.service';
import { Cp2020Cyberdeck } from './../models/cp2020-cyberdeck';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-cyberdeck-selector',
  templateUrl: './cp2020-cyberdeck-selector.component.html',
  styleUrls: ['./cp2020-cyberdeck-selector.component.css']
})
export class Cp2020CyberdeckSelectorComponent implements OnInit {

  @Output()
  selectCyberdeck = new EventEmitter<Cp2020Cyberdeck>();

  deckListData: Array<Cp2020Cyberdeck> = new Array<Cp2020Cyberdeck>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log('ngOnInit Cyberdeck-Selector');
    this.dataService
    .GetJson(JsonDataFiles.CP2020_CYBERDECK_LIST_JSON)
    .subscribe( data => {
      console.log('loaded cyberdecks', data);
      this.deckListData = data.map( deck => new Cp2020Cyberdeck(deck));
    });
  }

  selectDeck(index: number) {
    const cyberDeck = new Cp2020Cyberdeck(this.deckListData[index]);
    this.selectCyberdeck.emit(cyberDeck);
  }

}
