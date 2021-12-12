import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], property: string, value: any): any[] {
    if (!property || property === '' || value === null || value === undefined || value === '') {
      return array;
    }
    const result = array.filter( obj => {
      switch ( typeof obj[property]) {
        case 'string':
          return obj[property].toLowerCase().startsWith(value.toLowerCase());
        case 'number':
          return obj[property] === +value;
        case 'boolean':
          return obj[property] === value;
        case 'undefined':
          if (property.includes('.')) {
            return this.processObject(obj, property, value);
          } else {
            return false;
          }
        default:
          if (Array.isArray(obj[property])) {
            const ar = [].concat(...obj[property]);
            return ar.find( (sk: string) => {
              return sk.toLowerCase().startsWith(value.toLowerCase());
            });
          }
          // assume this is an object
          return this.processObject(obj, property, value);
      }
    });
    return result;
  }


  /**
   * Process an object item
   *
   * @param {*} obj - objec to test
   * @param {string} property - property of the object to evaluate
   * @param {*} value - value to compare
   * @returns {boolean}
   * @memberof FilterPipe
   */
  processObject(obj: any, property: string, value: any ): boolean {
    // property should use ':' to designate the object property
    if (!property.includes('.')) {
      return false;
    }
    const objProp = property.split('.')[0];
    const subProp = property.split('.')[1];
    if (obj[objProp] === undefined || obj[objProp] === null || obj[objProp][subProp] === undefined) {
      return false;
    }
    switch ( typeof obj[objProp][subProp]) {
      case 'string':
        return obj[objProp][subProp].toLowerCase().startsWith(value.toLowerCase());
      case 'number':
        return obj[objProp][subProp] === value;
      case 'boolean':
        return obj[objProp][subProp] === value;
      default:
        // assume this is an object
        return false;
    }
  }

}
