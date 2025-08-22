import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueValues',
  standalone: false,
})
export class UniqueValuesPipe implements PipeTransform {

  transform(array: [], property: string): any[] {
if (
      array === null ||
      array === undefined ||
      !Array.isArray(array) ||
      array.length < 1 ||
      !property ||
      property === ''
    ) {
      return array;
    }
    let result:any[] = [];
    array.filter((obj) => {
      switch (typeof obj[property]) {
        case 'string':
        case 'number':
        case 'boolean':
          return result.push(obj[property]);
        case 'undefined':
          return;
        default:
          if(Array.isArray(obj[property])) {
            result = result.concat(obj[property]);
          }
          return;
      }
    });
    return result.filter(this.onlyUnique);
  }

  onlyUnique(value:any, index: number, array: any[]): boolean {
    return array.indexOf(value) === index;
  }

}
