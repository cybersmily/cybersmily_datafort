import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'celsius',
    standalone: false
})
export class CelsiusPipe implements PipeTransform {

  transform(temp: any): number {
    if (isNaN(temp) || (typeof temp !== 'number' && typeof temp !== 'string')) {
      return 0;
    }
    return Math.round((+temp - 32) /1.8);
  }

}
