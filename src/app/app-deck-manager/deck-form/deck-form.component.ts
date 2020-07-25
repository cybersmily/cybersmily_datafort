import { NrDeckChassis } from './../../shared/models/netrun/nr-deck-chassis';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NrDeckDataService } from './../../shared/services/netrun/nr-deck-data.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Cp2020NetrunDeck, NrDeckData, NrDeckOption } from '../../shared/models/netrun';
import { Component, OnInit, TemplateRef, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.css']
})
export class DeckFormComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  modalRef: BsModalRef;

  @Input()
  deck: Cp2020NetrunDeck = new Cp2020NetrunDeck();

  selectedChassis: NrDeckChassis;

  deckData: NrDeckData = { chassis: [], options: new Array<NrDeckOption>()};

  @Output()
  update: EventEmitter<Cp2020NetrunDeck> = new EventEmitter<Cp2020NetrunDeck>();

  config = {
    keyboard: true
  };

  constructor(private deckDataService: NrDeckDataService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.deckDataService.getDeckData()
    .subscribe( data => {
      this.deckData = data;
      if (this.deck.options.length > 0){
        this.deck.options.forEach( opt => {
          const i = this.deckData.options.findIndex( o => o.name === opt.name);
          if ( i > -1) {
            this.deckData.options[i].count = opt.count;
          }
        });
      }
      this.selectedChassis = this.deck.type;
    });

  }

  ngOnChanges() {
    this.selectedChassis = this.deck.type;
  }

  showOptions(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }


  checkOption(opt: NrDeckOption) {
    if (opt.count && opt.count > 0 ) {
      if (!this.deck.options.some( (o: NrDeckOption) => o.name === opt.name)) {
        this.deck.options.push(opt);
      } else {
        const i = this.deck.options.findIndex( o => o.name === opt.name);
        this.deck.options[i].count = opt.count;
      }
    } else {
      const i = this.deck.options.findIndex( o => o.name === opt.name);
      this.deck.options.splice(i, 1);
    }
    this.updateDeck();
  }

  updateDeck() {
    this.update.emit(this.deck);
  }

  changeType() {
    this.deck.type = this.selectedChassis;
    this.updateDeck();
  }

  compare(a: NrDeckChassis, b: NrDeckChassis) {
    return a  && b ? a.name === b.name : a === b;
  }
}
