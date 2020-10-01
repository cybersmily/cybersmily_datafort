import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GigSectionRoutingModule } from './gigsection-routing.module';
import { TocComponent } from './toc/toc.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { NewsComponent } from './news/news.component';
import { NewsadminComponent } from './newsadmin/newsadmin.component';


@NgModule({
  imports: [
    CommonModule,
    GigSectionRoutingModule,
    CommonUiModule
  ],
  declarations: [TocComponent, ScenarioComponent, NewsComponent, NewsadminComponent]
})
export class GigSectionModule { }
