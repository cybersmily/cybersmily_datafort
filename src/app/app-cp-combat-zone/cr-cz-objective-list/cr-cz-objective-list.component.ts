import { CrCzArmyBuilderService } from './../services/cr-cz-army-builder/cr-cz-army-builder.service';
import { faStar, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { iCrCzObjectiveCard } from '../models/cr-cz-objective-card';
import { CrCzObjectiveDataService } from '../services/cr-cz-objective-data/cr-cz-objective-data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cs-cr-cz-objective-list',
  templateUrl: './cr-cz-objective-list.component.html',
  styleUrls: ['./cr-cz-objective-list.component.css']
})
export class CrCzObjectiveListComponent {
  faStar = faStar;
  faPlus = faPlus;
  faTrash = faTrash;

  dataList$: Observable<Array<iCrCzObjectiveCard>>;
  selectedObjective: iCrCzObjectiveCard;
  modalRef: BsModalRef;

  @Input()
  filterFaction: string = '';

  @Input()
  squadIndex: number = -1;

  @Input()
  ownedObjectives: Array<iCrCzObjectiveCard> = [];

  constructor(private CrCzProgramDataService: CrCzObjectiveDataService,
    private combatzoneBuilder: CrCzArmyBuilderService,
    private modalService: BsModalService
  ){}

  ngOnInit(): void {
    this.dataList$ = this.CrCzProgramDataService.objectiveList;
  }

  setFaction($event): void {
    this.filterFaction = $event;
  }

  addObjective(objective:iCrCzObjectiveCard):void  {
    this.combatzoneBuilder.addScenarioObjective(this.squadIndex, objective);
  }

  removeObjective(objective:iCrCzObjectiveCard): void {
    this.combatzoneBuilder.removeObjective(this.squadIndex, objective);
  }


  toggleSelected(template: TemplateRef<unknown>, objective: iCrCzObjectiveCard): void {
    this.modalRef = this.modalService.show(template);
    this.selectedObjective = objective;

  }

  hideModal(): void {
    if(this.modalRef) {
      this.modalRef.hide();
    }
  }

  hasObjective(objective: iCrCzObjectiveCard): boolean {
    return this.ownedObjectives.some(obj => obj.name === objective.name);
  }

  getObjectiveCardImage(objective:iCrCzObjectiveCard): string {
    return `img/cz/objectives/${objective.faction?.replaceAll(' ', '_')}_${objective.name?.replaceAll(' ', '_').replaceAll('.', '').replaceAll('\'','%27')}.png`;
  }
}
