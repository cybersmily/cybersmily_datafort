
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GigSectionRoutingModule } from './gigsection-routing.module';
import { TocComponent } from './toc/toc.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { NewsComponent } from './news/news.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    CommonModule,
    GigSectionRoutingModule,
    AccordionModule,
    FontAwesomeModule
  ],
  declarations: [TocComponent, ScenarioComponent, NewsComponent]
})
export class GigSectionModule { }
