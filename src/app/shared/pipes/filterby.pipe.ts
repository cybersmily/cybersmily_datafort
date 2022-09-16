import { SearchFilters } from './../models/search-filters';
import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';

@Pipe({
  name: 'filterby',
})
export class FilterbyPipe implements PipeTransform {
  /**
   * FilterBy pipe takes in a searchFilter object {[props]: {value: string, exact: boolean}}.
   * props is a parameter/key value that maps to a columnn within the value array.
   *
   * @param {Array<any>} value
   * @param {*} searchFilters
   * @return {Array<any>}  filtered array of objects based on the searchFilters object
   * @memberof FilterbyPipe
   */
  transform(value: Array<any>, searchFilters: SearchFilters): Array<any> {
    if (searchFilters == null || !Array.isArray(value)) {
      return value;
    }
    return value.filter((value) => {
      let result = true;
      for (let key in searchFilters) {
        const searchItem = searchFilters[key]?.value + '';
        const exact = searchFilters[key]?.exact;
        let item = get(value, key);
        if (searchItem !== '' && !isNaN(Number(searchItem))) {
          console.log('is a number', Number(searchItem), item);
          result = item === Number(searchItem);
        } else if (typeof item === 'string') {
          item += '';
          if (searchItem !== '' && !exact) {
            result =
              result && item?.toLowerCase().includes(searchItem?.toLowerCase());
          }
          if (searchItem !== '' && exact) {
            result =
              result && value[key]?.toLowerCase() === searchItem?.toLowerCase();
          }
        } else if (Array.isArray(item) && searchItem !== '') {
          result = item.includes(searchItem);
        }
      }
      return result;
    });
  }
}
