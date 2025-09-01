import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
    name: 'orderByProps',
    standalone: false
})
export class OrderByPropsPipe implements PipeTransform {
  transform(
    array: Array<any>,
    sortBy: Array<any>,
    order?: Array<string>
  ): Array<any> {
    const sortOrder = order ? order : ['asc']; // setting default ascending order
    return orderBy(array, sortBy, sortOrder);
  }
}
