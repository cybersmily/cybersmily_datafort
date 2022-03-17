import { CPHeadlinesGeneratorService } from './../shared/services/c-p-headlines-generator/c-p-headlines-generator.service';
import { DataService } from './../shared/services/file-services';
import { DiceService } from './../shared/services/dice/dice.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpNewsHeadlinesRoutingModule } from './app-news-headlines-routing.module';
import { AppHeadlinesFormComponent } from './app-headlines-form/app-headlines-form.component';


@NgModule({
  declarations: [AppHeadlinesFormComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    CpNewsHeadlinesRoutingModule
  ],
  providers: [
    DiceService,
    DataService,
    CPHeadlinesGeneratorService
  ]
})
export class AppNewsHeadlinesModule { }
