import { NrDeckManagerService } from './../../../services/netrun/nr-deck-manager.service';
import { Cp2020ProgramList, Cp2020Cyberdeck, Cp2020CyberdeckManager } from './../models';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cp2020-cyber-deck-section',
  templateUrl: './cp2020-cyber-deck-section.component.html',
  styleUrls: ['./cp2020-cyber-deck-section.component.css']
})
export class Cp2020CyberDeckSectionComponent implements OnInit, OnChanges {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  get collapseChevron():any {
    return (this.isCollapsed) ? this.faChevronRight : this.faChevronDown;
  }

  @Input()
  isCollapsed = true;

  currManager = new Cp2020CyberdeckManager();

  @Input()
  cyberdeckManager = new Cp2020CyberdeckManager();

  @Output()
  updateCyberdeckPrograms = new EventEmitter<Cp2020CyberdeckManager>();

  constructor(private deckManagerService: NrDeckManagerService) { }

  ngOnInit(): void {
    this.currManager = new Cp2020CyberdeckManager(this.cyberdeckManager);
  }

  ngOnChanges(): void {
    this.currManager = new Cp2020CyberdeckManager(this.cyberdeckManager);
  }

  updateDeck($event: Cp2020Cyberdeck) {
    this.currManager.deck = new Cp2020Cyberdeck($event);
    this.updateCyberdeckPrograms.emit(this.currManager);
  }

  uploadList(list: Cp2020ProgramList) {
    console.log('uploadList', list);
    this.currManager.programList = list;
    this.updateCyberdeckPrograms.emit(this.currManager);
  }

  reset() {
    this.currManager = new Cp2020CyberdeckManager();
    this.updateCyberdeckPrograms.emit(this.currManager);
  }
}
