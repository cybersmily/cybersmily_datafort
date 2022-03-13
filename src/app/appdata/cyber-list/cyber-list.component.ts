import { Observable } from 'rxjs';
import { DataCyberware } from './../../shared/cp2020/cp2020-cyberware/models';
import { CyberDataService } from './../../shared/cp2020/cp2020-cyberware/services';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cyber-list',
  templateUrl: './cyber-list.component.html',
  styleUrls: ['./cyber-list.component.css']
})
export class CyberListComponent implements OnInit {
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  searchFilter = {
      type: '',
      subtype: '',
      name: '',
      desc: '',
      notes: '',
      hc: '',
      surg: '',
      source: ''
    };
    sortOrder = [
      {prop: 'type', desc: false},
      {prop: 'subtype', desc: false},
      {prop: 'name', desc: false},
      {prop: 'cost', desc: false},
      {prop: 'hc', desc: false},
      {prop: 'surgery', desc: false}
    ];
    orderBy = 'type';
    descending = false;

  cyberwareList$: Observable<Array<DataCyberware>>;

  constructor(private cyberData: CyberDataService, private seo: SeoService) { }


  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Cyberware List',
      '2001-09, Cybersmily\'s Datafort Cyberpunk 2020 Cyberware List from all sources and search capability.'
    );
    this.cyberwareList$ = this.cyberData.CyberwareList;
  }

  isSorted(property: string): boolean {
    return this.sortOrder.find( sort => sort.prop === property).desc;
  }

  toggleSort(property: string) {
    const index = this.sortOrder.findIndex( sort => sort.prop === property);
    this.sortOrder[index].desc = !this.sortOrder[index].desc;
    // reorder the list
    this.sortOrder.splice(0, 0, this.sortOrder.splice(index, 1)[0]);
    // force the pipe to re-evaluate
    const arr = this.sortOrder.filter(a => a.prop);
    this.sortOrder = arr;
  }
}
