import { ArmorWeights } from './../cp2020/cp2020-armor/models';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'armorOptionMod'
})
export class ArmorOptionModPipe implements PipeTransform {

  transform(value: number | ArmorWeights, weight: string): number {
    if(!isNaN(+value)) {
      return +value;
    }
    if( isNaN(+value) && weight && weight !== '') {
      return +value[weight];
    }
    return 1;
  }

}
