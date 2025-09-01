import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'weightName',
    standalone: false
})
export class WeightNamePipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'lt':
        return 'light';
      case 'md':
      case 'med':
        return 'medium';
      case 'hvy':
        return 'heavy';
      default:
        return value;
    }
  }

}
