import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';

@Pipe({
  name: 'orderby',
})
export class OrderbyPipe implements PipeTransform {
  /**
   * sorty by will sort an array based on the property provide as the first argument,
   * second argument determines if it is descending order.
   *
   * @param {any[]} value
   * @param {...unknown[]} args
   * @return {*}  {any[]}
   * @memberof OrderbyPipe
   */
  transform(value: any[], ...args: unknown[]): any[] {
    if (!value || value.length <= 1) {
      return value;
    }
    // no arg provided, assume array is primtives and default ascending order
    if (!args || args.length < 1) {
      return value.sort();
    }
    // check to see if first arg is boolean.
    // if it is then assume array is of primitives and descending.
    if (typeof args[0] === 'boolean') {
      if (args[0]) {
        return value.sort().reverse();
      } else {
        return value.sort();
      }
    }
    if (typeof args[0] === 'string') {
      const property = args[0];
      const descending = args[1];
      if (descending) {
        return value
          .sort((a, b) => {
            return this.sortString(a, b, property);
          })
          .reverse();
      }
      return value.sort((a, b) => {
        return this.sortString(a, b, property);
      });
    }
    if (Array.isArray(args[0]) && args[0].length > 0 && args[0][0].prop) {
      const properties = args[0];
      return value.sort((a, b) => {
        return this.recursiveSort(a, b, properties);
      });
    }
    return value;
  }

  sortString(a, b, property): number {
    if (typeof a[property] === 'string') {
      return a[property]
        ?.toLowerCase()
        .localeCompare(b[property].toLowerCase());
    }
    return a[property] < b[property] ? 1 : -1;
  }

  recursiveSort(item1, item2, properties: Array<any>): number {
    const property = properties[0].prop;
    let value1 = get(item1, property);
    let value2 = get(item2, property);

    if (properties.length > 1 && value1 === value2) {
      return this.recursiveSort(item1, item2, properties.slice(1));
    }
    const test = properties[0].desc ? value1 > value2 : value1 < value2;
    return test ? -1 : 1;
  }
}
