import { CrCzProgramDataService } from './../services/cr-cz-program-data/cr-cz-program-data.service';
import { faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { iCrCzNrProgramCard } from '../models/cr-cz-nr-program-card';

@Component({
    selector: 'cs-cr-cz-program-list',
    templateUrl: './cr-cz-program-list.component.html',
    styleUrls: ['./cr-cz-program-list.component.css'],
    standalone: false
})
export class CrCzProgramListComponent {
  faStar = faStar;
  faPlus = faPlus;

  dataList$: Observable<Array<iCrCzNrProgramCard>>;
  filterReleases: Array<string> = [];

  @Input()
  filterFaction: string = '';

  @Output()
  add: EventEmitter<iCrCzNrProgramCard> = new EventEmitter<iCrCzNrProgramCard>();

  constructor(private CrCzProgramDataService: CrCzProgramDataService){}

  ngOnInit(): void {
    this.dataList$ = this.CrCzProgramDataService.programList;
  }

  setFaction($event): void {
    this.filterFaction = $event;
  }

  releaseFilter($event): void {
    console.log('event',$event);
    this.filterReleases = $event;
  }

  buy(program: iCrCzNrProgramCard):void  {
    this.add.emit(program);
  }
}
