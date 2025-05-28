import { faTrash, faStar, faPlus, faRedo, faFilePdf, faChevronRight, faChevronLeft, faBullseye, faUsersLine, faComment, faFileLines, faUserPlus, faDice } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, EventEmitter } from '@angular/core';
import { iCrCzSquad } from '../models/cr-cz-squad';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { CrCzArmyBuilderService } from '../services/cr-cz-army-builder/cr-cz-army-builder.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CrCzArmyPdfService } from '../services/cr-cz-army-pdf/cr-cz-army-pdf.service';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { iCrCzObjectiveCard } from '../models/cr-cz-objective-card';
import { CrCzObjectiveDataService } from '../services/cr-cz-objective-data/cr-cz-objective-data.service';
import { CrCzScenarioObjectivesGeneratorService } from '../services/cr-cz-scenario-objectives-generator/cr-cz-scenario-objectives-generator.service';

@Component({
  selector: 'cs-cr-cz-squad-form',
  templateUrl: './cr-cz-squad-form.component.html',
  styleUrls: ['./cr-cz-squad-form.component.css']
})
export class CrCzSquadFormComponent implements OnInit, OnChanges {

  faTrash = faTrash;
  faStar = faStar;
  faPlus = faPlus;
  faRedo = faRedo;
  faFilePdf = faFilePdf;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faBullseye = faBullseye;
  faUsersLine = faUsersLine;
  faFileLines = faFileLines;
  faUserPlus = faUserPlus;
  faDice = faDice;

  faction = '';
  selectedTab = "team";

  luck: Array<number> = [];
  private _selectedUnitIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  selectedUnitIndex$: Observable<number> = this._selectedUnitIndex.asObservable();
  selectedUnitName: string = '';
  squadTotalStreetcred: number = 0;
  selectedObjectives: Array<iCrCzObjectiveCard>;
  squadNotes: string = '';
  showGenerateRandomObjective: boolean = false;

  modalRef: BsModalRef;
  modalConfig: ModalOptions = {
    class: 'modal-right modal-xl',
    animated: true,
  };

  @Input()
  squadIndex: number;

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  public get squad$(): Observable<iCrCzSquad> {
    return this.combatzoneArmyBuilder
    .getSquad(this.squadIndex)
  }

  constructor(private combatzoneArmyBuilder: CrCzArmyBuilderService,
    private modalService: BsModalService,
    private pdfService: CrCzArmyPdfService,
    private scenarioObjectiveService: CrCzScenarioObjectivesGeneratorService
  ) {}

  ngOnInit(): void {
    this.squad$.subscribe(squad => {
      this.squadNotes = squad.notes;
    });
  }

  ngOnChanges(): void {
    this.squad$.subscribe(squad => {
      this.squadNotes = squad.notes;
    })
  }


  generateRandomObjectives($event: MouseEvent, squad: iCrCzSquad): boolean {
    this.scenarioObjectiveService
    .getRandomObjectives(3, squad.faction, squad.objectives.map(obj => obj.name))
    .pipe(take(1))
    .subscribe(objectives => {
      this.combatzoneArmyBuilder.updateScenarioObjectives(this.squadIndex, objectives);
    });
    $event.stopPropagation();
    return false;
  }

  showModal(template: TemplateRef<any>, faction: string) {
    this.faction = faction;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  showObjectiveModal(template: TemplateRef<any>, objectives:Array<iCrCzObjectiveCard>, faction: string): void {
    this.selectedObjectives = objectives;
    this.showModal(template, faction);
  }

  showUnitModal(template: TemplateRef<any>, unitName:string, unitIndex:number, faction: string): void {
    this._selectedUnitIndex.next(unitIndex);
    this.selectedUnitName = unitName;
    this.showModal(template, faction);
  }

  closeModal() {
    this.modalRef.hide();
  }

  inspireTeam() {
    this.combatzoneArmyBuilder.inspireTeam(this.squadIndex);
  }

  removeSquad(): void {
    this.delete.emit(this.squadIndex);
  }

  addObjective(squadIndex: number, objective: iCrCzObjectiveCard): void {
    this.combatzoneArmyBuilder.addScenarioObjective(squadIndex, objective);
  }

  randomObjectiveIsOpen($event: boolean): void {
    this.showGenerateRandomObjective = $event;
  }

  removeObjective(squadIndex: number, objective: iCrCzObjectiveCard): void {
    this.combatzoneArmyBuilder.removeObjective(squadIndex, objective);
  }

  removeUnit(unitIndex: number): void {
    this.combatzoneArmyBuilder.removeUnit(this.squadIndex, unitIndex);
  }

  updateLuck(amount: number): void {
    this.combatzoneArmyBuilder.updateSquadLuck(this.squadIndex, amount);
  }

  navigateMembers(nav: number, length: number): void {
    let index = this._selectedUnitIndex.getValue() + nav;
    index = (index >= length) ? 0 : (index < 0) ? length - 1 : index;
    this._selectedUnitIndex.next(index);
  }

  togglePayVeteran(): void {
    this.combatzoneArmyBuilder.updateSquadVeteranCost(this.squadIndex);
  }

  createPDF() {
    this.squad$.pipe(take(1)).subscribe( squad =>
      this.pdfService.generateCombatZoneArmyList(squad, `CombatZone_${squad.name}.pdf`)
    );
  }

  updateSquadNotes(): void {
    this.combatzoneArmyBuilder.updateSquadNotes(this.squadIndex, this.squadNotes);
  }

  setTab(data: TabDirective,name: string): void {
    this.selectedTab = name;
  }

}

