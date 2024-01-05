import { DND_TYPE_CP2020_PROGRAM } from './../../../models/constants';
import { DndDropEvent } from 'ngx-drag-drop';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable } from 'rxjs';
import { Cp2020CyberdecksDataService } from './../services';
import { Cp2020Program, CyberdeckChassis } from '../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NrDeckDataService } from '../../../services/netrun/nr-deck-data.service';
import { faPlus, faSearch, faRedo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cp2020Cyberdeck, CyberdeckData, CyberdeckOption } from '../models';
import { Component, OnInit, TemplateRef, EventEmitter, Output, Input, OnChanges, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'cs-cp2020-cyberdeck-form',
  templateUrl: './cp2020-cyberdeck-form.component.html',
  styleUrls: ['./cp2020-cyberdeck-form.component.css']
})
export class Cp2020CyberdeckFormComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  faSearch = faSearch;
  faRedo = faRedo;
  faTrash = faTrash;

  modalRef: BsModalRef;

  @Input()
  deck: Cp2020Cyberdeck = new Cp2020Cyberdeck();

  selectedChassis: CyberdeckChassis;
  isDropDisabled: boolean  = false;

  deckData: CyberdeckData = { chassis: [], options: new Array<CyberdeckOption>()};
  deckListData$: Observable<Array<Cp2020Cyberdeck>> = new Observable<Array<Cp2020Cyberdeck>>();

  @Output()
  update: EventEmitter<Cp2020Cyberdeck> = new EventEmitter<Cp2020Cyberdeck>();

  @ViewChild('cyberdeckNameElem', {static: false})
  cyberdeckNameInput: ElementRef;

  @ViewChild('addOptionElem', {static:false})
  cyberdeckOptionButton: ElementRef;

  @ViewChildren('optionCountElem')
  optionCountList: QueryList<ElementRef>;

  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-xl'
  };
  currDeck: Cp2020Cyberdeck = new Cp2020Cyberdeck();

  get overDeckMU(): boolean {
    return this.currDeck.usedMu > this.currDeck.totalMU;
  }

  constructor(private deckDataService: NrDeckDataService,
    private modalService: BsModalService,
    private cyberdecksDataService: Cp2020CyberdecksDataService) { }

  ngOnInit(): void {
    this.currDeck = new Cp2020Cyberdeck(this.deck);
    this.deckListData$ = this.cyberdecksDataService.cyberdeckList;
    this.deckDataService.getDeckData()
    .subscribe( data => {
      this.deckData = data;
      if (this.deck.options.length > 0){
        this.deck.options = this.deck.options.map( opt => {
          const index = this.deckData.options.findIndex( o => o.name === opt.name);
          if ( index > -1) {
            this.deckData.options[index].count = opt.count;
            opt.slot = this.deckData.options[index].slot;
            opt.slotType = this.deckData.options[index].slotType;
          }
          return opt;
        });
      }
      this.selectedChassis = this.deck.type;
    });
  }

  ngOnChanges() {
    this.selectedChassis = this.currDeck.type;
    this.currDeck = new Cp2020Cyberdeck(this.deck);
  }

  showModal(template: TemplateRef<any>, returnFocus?: string) {
    this.modalRef = this.modalService.show(template, this.config);
    if(returnFocus){
      this.modalRef.onHidden.subscribe(() => {
        switch(returnFocus) {
          case 'search':
            this.cyberdeckNameInput.nativeElement.focus();
            break;
          case 'option':
            this.cyberdeckOptionButton.nativeElement.focus();
            break;
        }
      });
    }
  }


  checkOption(opt: CyberdeckOption) {
    this.currDeck.updateOption(opt);
    this.updateDeck();
  }

  updateDeck() {
    // backward compatible
    this.currDeck.options = this.currDeck.options.map( opt => {
      const index = this.deckData.options.findIndex( o => o.name === opt.name);
      if ( index > -1) {
        opt.slot = this.deckData.options[index].slot;
        opt.slotType = this.deckData.options[index].slotType;
      }
      return opt;
    });

    this.update.emit(this.currDeck);
  }

  changeType() {
    this.currDeck.type = this.selectedChassis;
    this.updateDeck();
  }

  compare(a: CyberdeckChassis, b: CyberdeckChassis) {
    return a  && b ? a.name === b.name : a === b;
  }

  selectCyberdeck(cyberdeck: Cp2020Cyberdeck) {
    this.currDeck = cyberdeck;
    this.updateDeck();
    this.modalRef.hide();
  }

  selectDeck(event: TypeaheadMatch): void {
    const chassis = event.item.type;
    this.currDeck = new Cp2020Cyberdeck(event.item);

    this.updateDeck();
  }

  removeProgram(index: number): void {
    if(index > -1) {
      this.currDeck.programs.splice(index, 1);
      this.updateDeck();
    }
  }

  onDrop(event:DndDropEvent): void {
    if(event.data.type === DND_TYPE_CP2020_PROGRAM) {
      const prog = event.data.program as Cp2020Program ;
        this.currDeck.programs.push(new Cp2020Program(event.data.program));
        this.updateDeck();
    }
  }


}
