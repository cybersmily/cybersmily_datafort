import { SearchFilters } from './../../../models/search-filters';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';
import { DataListColumnParameters } from '../models/data-list-parameters';

@Component({
  selector: 'cs-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css'],
})
export class DataListComponent implements OnInit {
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  searchFilter: SearchFilters = {};
  sourceFilter: string = '';
  sortOrder: Array<{ prop: string; desc: boolean }> = [];

  @Input()
  dataList: Array<any> = [];

  @Input()
  columnsParameters: Array<DataListColumnParameters> = [];

  constructor() {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.sortOrder = this.columnsParameters
      ?.map((param) => {
        if (param.filters) {
          this.searchFilter[param.property] = {
            value: '',
            exact: param.filters === 'filter',
          };
        }
        if (param.sort) {
          return { prop: param.sort, desc: false };
        }
      })
      .filter((entry) => entry);
  }

  refreshFilter() {
    this.searchFilter = { ...this.searchFilter };
  }

  isSorted(param: DataListColumnParameters): boolean {
    return this.sortOrder.find((sort) => sort.prop.startsWith(param.property))
      .desc;
  }

  toggleSort(param: DataListColumnParameters): void {
    const index = this.sortOrder.findIndex((sort) =>
      sort.prop.startsWith(param.property)
    );
    this.sortOrder[index].desc = !this.sortOrder[index].desc;
    // reorder the list
    this.sortOrder.splice(0, 0, this.sortOrder.splice(index, 1)[0]);
    // force the pipe to re-evaluate
    const arr = this.sortOrder.filter((a) => a.prop);
    this.sortOrder = arr;
  }
}
