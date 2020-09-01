import { ParsePipe } from './parse.pipe';
import { FilterPipe } from './filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcebookPipe } from './sourcebook.pipe';
import { SourcebookFilterPipe } from './sourcebook-filter.pipe';
import { ContainsPipe } from './contains.pipe';
import { OrderbyPipe } from './orderby.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    SourcebookPipe,
    SourcebookFilterPipe,
    ParsePipe,
    ContainsPipe,
    OrderbyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe,
    SourcebookPipe,
    SourcebookFilterPipe,
    ParsePipe,
    ContainsPipe,
    OrderbyPipe
  ]
})
export class PipesModule { }
