import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contains',
})
export class ContainsPipe implements PipeTransform {
  transform(array: any[], property: string, value: any): any {
    if (
      !property ||
      property === '' ||
      !Array.isArray(array) ||
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return array;
    }
    const result = array.filter((obj) => {
      switch (typeof obj[property]) {
        case 'string':
          return obj[property].toLowerCase().includes(value.toLowerCase());
        case 'number':
          return obj[property] === value;
        case 'boolean':
          return obj[property] === value;
        case 'undefined':
          if (property.includes('.')) {
            return this.processObject(obj, property, value);
          } else {
            return true;
          }
        default:
          if (Array.isArray(obj[property])) {
            const ar = [].concat(...obj[property]);
            return ar.find((sk: string) => {
              return sk.toLowerCase().includes(value.toLowerCase());
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
  processObject(obj: any, property: string, value: any): boolean {
    // property should use ':' to designate the object property
    if (!property.includes('.')) {
      return true;
    }
    const objProp = property.split('.')[0];
    const subProp = property.split('.')[1];
    if (
      obj[objProp] === undefined ||
      obj[objProp] === null ||
      obj[objProp][subProp] === undefined
    ) {
      return true;
    }
    switch (typeof obj[objProp][subProp]) {
      case 'string':
        return obj[objProp][subProp]
          .toLowerCase()
          .includes(value.toLowerCase());
      case 'number':
        return obj[objProp][subProp] === value;
      case 'boolean':
        return obj[objProp][subProp] === value;
      default:
        // assume this is an object
        return true;
    }
    return true;
  }
}
