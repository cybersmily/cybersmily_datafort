import { faTrash, faStar, faPlus, faRedo, faFilePdf, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, EventEmitter } from '@angular/core';
import { iCrCzSquad } from '../models/cr-cz-squad';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { CrCzArmyBuilderService } from '../services/cr-cz-army-builder/cr-cz-army-builder.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CrCzArmyPdfService } from '../services/cr-cz-army-pdf/cr-cz-army-pdf.service';

@Component({
  selector: 'cs-cr-cz-squad-form',
  templateUrl: './cr-cz-squad-form.component.html',
  styleUrls: ['./cr-cz-squad-form.component.css']
})
export class CrCzSquadFormComponent implements OnInit, OnChanges {

  squad$: Observable<iCrCzSquad>;
  faTrash = faTrash;
  faStar = faStar;
  faPlus = faPlus;
  faRedo = faRedo;
  faFilePdf = faFilePdf;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  faction = '';

  luck: Array<number> = [];
  private _selectedUnitIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  selectedUnitIndex$: Observable<number> = this._selectedUnitIndex.asObservable();
  selectedUnitName: string = '';
  squadTotalStreetcred: number = 0;

  modalRef: BsModalRef;
  modalConfig: ModalOptions = {
    class: 'modal-right modal-xl',
    animated: true,
  };

  @Input()
  squadIndex: number;

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();


  constructor(private combatzoneArmyBuilder: CrCzArmyBuilderService, private modalService: BsModalService, private pdfService: CrCzArmyPdfService) {}

  ngOnInit(): void {
    this.squad$ = this.combatzoneArmyBuilder.getSquad(this.squadIndex);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.squad$ = this.combatzoneArmyBuilder.getSquad(this.squadIndex);
  }

  showModal(template: TemplateRef<any>, faction: string) {
    this.faction = faction;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  showUnitModal(template: TemplateRef<any>, unitName:string, unitIndex:number): void {
    this._selectedUnitIndex.next(unitIndex);
    this.selectedUnitName = unitName;
    this.modalRef = this.modalService.show(template, this.modalConfig);
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

  removeUnit(unitIndex: number): void {
    this.combatzoneArmyBuilder.removeUnit(this.squadIndex, unitIndex);
  }

  updateLuck(amount: number): void {
    this.combatzoneArmyBuilder.updateSquadLuck(this.squadIndex, amount);
  }

  navigateMembers(nav: number, length: number): void {
    let index = this._selectedUnitIndex.getValue() + nav;
    index = (index >= length) ? 0 : (index < 0) ? length : index;
    this._selectedUnitIndex.next(index);
  }

  createPDF() {
    this.squad$.pipe(take(1)).subscribe( squad =>
      this.pdfService.generateCombatZoneArmyList(squad, `CombatZone_${squad.name}.pdf`)
    );
  }
}
