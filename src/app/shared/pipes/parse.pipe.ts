import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'parse',
    standalone: false
})
export class ParsePipe implements PipeTransform {

  transform(value: string): any {
    return value.replace('\\', '');
  }

}
