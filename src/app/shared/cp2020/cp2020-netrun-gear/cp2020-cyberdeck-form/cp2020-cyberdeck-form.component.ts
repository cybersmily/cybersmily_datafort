import { JsonDataFiles } from '../../../services/file-services/json-data-files';
import { forkJoin } from 'rxjs';
import { DataService } from '../../../services/file-services/data.service';
import { CyberdeckChassis } from '../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NrDeckDataService } from '../../../services/netrun/nr-deck-data.service';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Cp2020Cyberdeck, CyberdeckData, CyberdeckOption } from '../models';
import { Component, OnInit, TemplateRef, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-deck-form',
  templateUrl: './cp2020-cyberdeck-form.component.html',
  styleUrls: ['./cp2020-cyberdeck-form.component.css']
})
export class Cp2020CyberdeckFormComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  faSearch = faSearch;
  modalRef: BsModalRef;

  @Input()
  deck: Cp2020Cyberdeck = new Cp2020Cyberdeck();

  selectedChassis: CyberdeckChassis;

  deckData: CyberdeckData = { chassis: [], options: new Array<CyberdeckOption>()};
  deckListData: Array<Cp2020Cyberdeck> = new Array<Cp2020Cyberdeck>();

  @Output()
  update: EventEmitter<Cp2020Cyberdeck> = new EventEmitter<Cp2020Cyberdeck>();

  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };
  currDeck: Cp2020Cyberdeck = new Cp2020Cyberdeck();

  constructor(private deckDataService: NrDeckDataService,
    private modalService: BsModalService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.currDeck = new Cp2020Cyberdeck(this.deck);
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
          const newDeck = new Cp2020Cyberdeck(deck);
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


  checkOption(opt: CyberdeckOption) {
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

  compare(a: CyberdeckChassis, b: CyberdeckChassis) {
    return a  && b ? a.name === b.name : a === b;
  }

  selectDeck(index: number) {
    this.currDeck = this.deckListData[index];
    this.modalRef.hide();
  }
}
