import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterWithArray',
  standalone: false
})
export class FilterWithArrayPipe implements PipeTransform {

  transform(array: Array<any>, property: string, value: Array<string|number|boolean>): unknown {
    if (
      array === null ||
      !property ||
      property === '' ||
      property === null ||
      value === null ||
      value === undefined ||
      !Array.isArray(value) ||
      value?.length < 1
    ) {
      return array;
    }
    const result = array.filter((obj) => {
      switch (typeof obj[property]) {
        case 'string':
        case 'number':
        case 'boolean':
          return value.includes(obj[property]);
        default:
          // assume this is an object
          return false;
      }
    });
    return result;
  }

}
