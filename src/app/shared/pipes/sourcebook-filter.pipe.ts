import { SourceBookLookup } from './../models/source-book-lookup';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sourcebookFilter',
    standalone: false
})
export class SourcebookFilterPipe implements PipeTransform {
  transform(value: any[], term: string): any[] {
    if (!value || !Array.isArray(value)) {
      return value;
    }
    const results =
      value?.filter((obj) => {
        if (obj.source === undefined || obj.source === null) {
          return true;
        }
        if (typeof obj.source === 'string') {
          const source = SourceBookLookup.getSource(obj.source);
          return source.toLowerCase().includes(term.toLowerCase());
        }
        if (obj.source.book) {
          const source = SourceBookLookup.getSource(obj.source.book);
          return source.toLowerCase().includes(term.toLowerCase());
        }
      }) ?? value;
    return results;
  }
}
