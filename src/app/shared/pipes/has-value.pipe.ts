import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasValue',
})
export class HasValuePipe implements PipeTransform {
  transform(value: Array<any>, property: string): Array<any> {
    if (!value || value.length <= 1 || property == null) {
      return value;
    }
    return value.filter((item) => item[property] > 0);
  }
}
