import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cpRedFloorCostCalc',
    standalone: false
})
export class CPRedFloorCostCalcPipe implements PipeTransform {

  transform(value: number): unknown {
    if ( value < 7) {
      return 1000;
    } else if (value < 13) {
      return 5000;
    }
    return 10000;
  }

}
