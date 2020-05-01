import { ParsePipe } from './parse.pipe';
import { FilterPipe } from './filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcebookPipe } from './sourcebook.pipe';
import { SourcebookFilterPipe } from './sourcebook-filter.pipe';
import { ContainsPipe } from './contains.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    SourcebookPipe,
    SourcebookFilterPipe,
    ParsePipe,
    ContainsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe,
    SourcebookPipe,
    SourcebookFilterPipe,
    ParsePipe,
    ContainsPipe
  ]
})
export class PipesModule { }
