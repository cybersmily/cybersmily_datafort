import { QuickNrCalculatorService } from './../services/quick-nr-calculator/quick-nr-calculator.service';
import { NrDeckManagerService } from './../../../services/netrun/nr-deck-manager.service';
import {
  Cp2020ProgramList,
  Cp2020Cyberdeck,
  Cp2020CyberdeckManager,
} from './../models';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'cs-cp2020-cyber-deck-section',
  templateUrl: './cp2020-cyber-deck-section.component.html',
  styleUrls: ['./cp2020-cyber-deck-section.component.css'],
})
export class Cp2020CyberDeckSectionComponent implements OnInit, OnChanges {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  qnrPM = 0;

  get collapseChevron(): any {
    return this.isCollapsed ? this.faChevronRight : this.faChevronDown;
  }

  @Input()
  isCollapsed = true;

  currManager = new Cp2020CyberdeckManager();

  @Input()
  cyberdeckManager = new Cp2020CyberdeckManager();

  @Output()
  updateCyberdeckPrograms = new EventEmitter<Cp2020CyberdeckManager>();

  constructor(
    private deckManagerService: NrDeckManagerService,
    private qnrCalcService: QuickNrCalculatorService
  ) {}

  ngOnInit(): void {
    this.currManager = new Cp2020CyberdeckManager(this.cyberdeckManager);
    this.qnrPM = this.qnrCalcService.caculatePM(
      this.currManager.deck,
      this.currManager.programList
    );
  }

  ngOnChanges(): void {
    this.currManager = new Cp2020CyberdeckManager(this.cyberdeckManager);
    this.qnrPM = this.qnrCalcService.caculatePM(
      this.currManager.deck,
      this.currManager.programList
    );
  }

  updateDeck($event: Cp2020Cyberdeck) {
    this.currManager.deck = new Cp2020Cyberdeck($event);
    this.qnrPM = this.qnrCalcService.caculatePM(
      this.currManager.deck,
      this.currManager.programList
    );
    this.updateCyberdeckPrograms.emit(this.currManager);
  }

  uploadList(list: Cp2020ProgramList) {
    this.currManager.programList = list;
    this.qnrPM = this.qnrCalcService.caculatePM(
      this.currManager.deck,
      this.currManager.programList
    );
    this.updateCyberdeckPrograms.emit(this.currManager);
  }

  reset() {
    this.currManager = new Cp2020CyberdeckManager();
    this.qnrPM = this.qnrCalcService.caculatePM(
      this.currManager.deck,
      this.currManager.programList
    );
    this.updateCyberdeckPrograms.emit(this.currManager);
  }
}
