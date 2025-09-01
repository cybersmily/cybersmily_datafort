import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'encodeForXml',
    standalone: false
})
export class EncodeForXmlPipe implements PipeTransform {

  transform(value: string): string {
    if(typeof value !== 'string') {
      return '';
    }

    return value.replace('&', '&amp;')
      .replace('<', '&lt;')
      .replace('>', '&gt;')
      .replace('"', '&quot;')
      .replace('\'', '&apos;');
  }

}
