import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'greaterThan',
    standalone: false
})
export class GreaterThanPipe implements PipeTransform {
  transform(value: Array<any>, property: string, num: number): Array<any> {
    if (
      value === null ||
      property === null ||
      typeof property !== 'string' ||
      isNaN(num)
    ) {
      return value;
    }
    return value.filter((item) => item[property] && item[property] > num);
  }
}
