import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parse'
})
export class ParsePipe implements PipeTransform {

  transform(value: string): any {
    return value.replace('\\', '');
  }

}
