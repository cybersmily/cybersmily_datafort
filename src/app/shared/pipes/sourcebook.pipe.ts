import { SourceBookLookup } from './../models/source-book-lookup';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sourcebook'
})
export class SourcebookPipe implements PipeTransform {

  transform(abbrev: string): string {
    return SourceBookLookup.getSource(abbrev);
  }

}
