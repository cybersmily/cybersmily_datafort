import { JsonDataFiles } from '../../../services/file-services/json-data-files';
import { forkJoin } from 'rxjs';
import { DataService } from '../../../services/file-services/data.service';
import { NrDeckChassis } from '../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NrDeckDataService } from '../../../services/netrun/nr-deck-data.service';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Cp2020NetrunDeck, NrDeckData, NrDeckOption } from '../models';
import { Component, OnInit, TemplateRef, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-deck-form',
  templateUrl: './cp2020-deck-form.component.html',
  styleUrls: ['./cp2020-deck-form.component.css']
})
export class Cp2020DeckFormComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  faSearch = faSearch;
  modalRef: BsModalRef;

  @Input()
  deck: Cp2020NetrunDeck = new Cp2020NetrunDeck();

  selectedChassis: NrDeckChassis;

  deckData: NrDeckData = { chassis: [], options: new Array<NrDeckOption>()};
  deckListData: Array<Cp2020NetrunDeck> = new Array<Cp2020NetrunDeck>();

  @Output()
  update: EventEmitter<Cp2020NetrunDeck> = new EventEmitter<Cp2020NetrunDeck>();

  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };
  currDeck: Cp2020NetrunDeck = new Cp2020NetrunDeck();

  constructor(private deckDataService: NrDeckDataService,
    private modalService: BsModalService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.currDeck = new Cp2020NetrunDeck(this.deck);
    forkJoin([
      this.deckDataService.getDeckData(),
      this.dataService.GetJson(JsonDataFiles.CP2020_DECKS_PROGRAMS_JSON)
    ])
    .subscribe( data => {
      this.deckData = data[0];
      if (this.deck.options.length > 0){
        this.deck.options.forEach( opt => {
          const i = this.deckData.options.findIndex( o => o.name === opt.name);
          if ( i > -1) {
            this.deckData.options[i].count = opt.count;
          }
        });
      }
      this.selectedChassis = this.deck.type;

      // load the list of decks
      if (data[1].decks && Array.isArray(data[1].decks)){
        data[1].decks.forEach(deck => {
          const newDeck = new Cp2020NetrunDeck(deck);
          this.deckListData.push(newDeck);
        });
      }
    });

  }

  ngOnChanges() {
    this.selectedChassis = this.currDeck.type;
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }


  checkOption(opt: NrDeckOption) {
    this.currDeck.updateOption(opt);
    this.updateDeck();
  }

  updateDeck() {
    this.update.emit(this.currDeck);
  }

  changeType() {
    this.currDeck.type = this.selectedChassis;
    this.updateDeck();
  }

  compare(a: NrDeckChassis, b: NrDeckChassis) {
    return a  && b ? a.name === b.name : a === b;
  }

  selectDeck(index: number) {
    this.currDeck = this.deckListData[index];
    this.modalRef.hide();
  }
}
