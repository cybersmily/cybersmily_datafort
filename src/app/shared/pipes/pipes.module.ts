import { ParsePipe } from './parse.pipe';
import { FilterPipe } from './filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcebookPipe } from './sourcebook.pipe';
import { SourcebookFilterPipe } from './sourcebook-filter.pipe';
import { ContainsPipe } from './contains.pipe';
import { OrderbyPipe } from './orderby.pipe';
import { CelsiusPipe } from './celsius.pipe';
import { WeightNamePipe } from './weight-name.pipe';
import { ArmorOptionModPipe } from './armor-option-mod.pipe';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { FilterbyPipe } from './filterby.pipe';
import { HasValuePipe } from './has-value.pipe';
import { OrderByPropsPipe } from './order-by-props.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    SourcebookPipe,
    SourcebookFilterPipe,
    ParsePipe,
    ContainsPipe,
    OrderbyPipe,
    CelsiusPipe,
    WeightNamePipe,
    ArmorOptionModPipe,
    SanitizeHtmlPipe,
    FilterbyPipe,
    HasValuePipe,
    OrderByPropsPipe,
  ],
  imports: [CommonModule],
  exports: [
    FilterPipe,
    FilterbyPipe,
    SourcebookPipe,
    SourcebookFilterPipe,
    ParsePipe,
    ContainsPipe,
    OrderbyPipe,
    CelsiusPipe,
    WeightNamePipe,
    ArmorOptionModPipe,
    SanitizeHtmlPipe,
    HasValuePipe,
    OrderByPropsPipe,
  ],
})
export class PipesModule {}
