import { CrCzArmyBuilderService } from './../services/cr-cz-army-builder/cr-cz-army-builder.service';
import { faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { iCrCzObjectiveCard } from '../models/cr-cz-objective-card';
import { CrCzObjectiveDataService } from '../services/cr-cz-objective-data/cr-cz-objective-data.service';

@Component({
  selector: 'cs-cr-cz-objective-list',
  templateUrl: './cr-cz-objective-list.component.html',
  styleUrl: './cr-cz-objective-list.component.css'
})
export class CrCzObjectiveListComponent {
  faStar = faStar;
  faPlus = faPlus;

  dataList$: Observable<Array<iCrCzObjectiveCard>>;

  @Input()
  filterFaction: string = '';

  @Input()
  squadIndex: number = -1;

  constructor(private CrCzProgramDataService: CrCzObjectiveDataService, private combatzoneBuilder: CrCzArmyBuilderService){}

  ngOnInit(): void {
    this.dataList$ = this.CrCzProgramDataService.objectiveList;
  }

  setFaction($event): void {
    this.filterFaction = $event;
  }

  addObjective(objective:iCrCzObjectiveCard):void  {
    this.combatzoneBuilder.addObjective(this.squadIndex, objective);
  }
}
