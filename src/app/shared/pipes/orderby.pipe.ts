import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

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
      return value.sort((a, b) => {
        const test = (descending) ? (a[property] < b[property]) : (a[property] > b[property]);
        return test ? 1 : -1;
      });
    }
    if (Array.isArray(args[0]) && args[0].length > 0 && args[0][0].prop) {
      const properties = args[0];
      return value.sort( (a, b) => {
        return this.recursiveSort(a, b, properties);
      });
    }
    return value;
  }

  recursiveSort(item1, item2, properties: Array<any>): number {
    const property = properties[0].prop;
    if (properties.length > 1 && item1[property] === item2[property]) {
      return this.recursiveSort(item1, item2, properties.slice(1));
    }
    const test = (properties[0].desc) ? (item1[property] > item2[property]) : (item1[property] < item2[property]);
    return test ? -1 : 1;
  }
}
