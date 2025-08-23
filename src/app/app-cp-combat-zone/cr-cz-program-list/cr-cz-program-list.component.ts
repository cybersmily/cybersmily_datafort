import { CrCzProgramDataService } from './../services/cr-cz-program-data/cr-cz-program-data.service';
import { faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, input, output } from '@angular/core';
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
  currentFilterFaction: string;

  filterFaction = input<string>('');
  add = output<iCrCzNrProgramCard>();

  constructor(private CrCzProgramDataService: CrCzProgramDataService){}

  ngOnInit(): void {
    this.currentFilterFaction = this.filterFaction();
    this.dataList$ = this.CrCzProgramDataService.programList;
  }

  setFaction($event): void {
    this.currentFilterFaction = $event;
  }

  releaseFilter($event): void {
    this.filterReleases = $event;
  }

  buy(program: iCrCzNrProgramCard):void  {
    this.add.emit(program);
  }
}
