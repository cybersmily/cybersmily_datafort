import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthArray'
})
export class MonthArrayPipe implements PipeTransform {

  transform(value: Array<any>): unknown {
    return [
      value.slice(0,7),
      value.slice(7,14),
      value.slice(14,21),
      value.slice(21,28),
      value.slice(28)
    ];
  }

}
