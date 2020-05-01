import { ModSectionRoutingModule } from './modsection-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleComponent } from './article/article.component';

@NgModule({
  imports: [
    CommonModule,
    ModSectionRoutingModule
  ],
  declarations: [ArticleComponent]
})
export class ModSectionModule { }
