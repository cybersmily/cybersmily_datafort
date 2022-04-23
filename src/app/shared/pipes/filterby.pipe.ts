import { SearchFilters } from './../models/search-filters';
import { Pipe, PipeTransform } from '@angular/core';

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
        if (searchFilters[key]?.value !== '' && !searchFilters[key]?.exact) {
          result =
            result &&
            value[key]
              ?.toLowerCase()
              .includes(searchFilters[key]?.value?.toLowerCase());
        }
        if (searchFilters[key]?.value !== '' && searchFilters[key]?.exact) {
          result =
            result &&
            value[key]?.toLowerCase() ===
              searchFilters[key]?.value?.toLowerCase();
        }
      }
      return result;
    });
  }
}
