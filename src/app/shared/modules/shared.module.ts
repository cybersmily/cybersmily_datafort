import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../modules/common-ui/common-ui.module';
import { RouterModule } from '@angular/router';
import { DataService } from './../services/file-services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent, TopNavComponent } from './../components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonUiModule,
    BrowserAnimationsModule
  ],
  exports: [
    CommonModule,
    FooterComponent,
    TopNavComponent],
  declarations: [FooterComponent, TopNavComponent],
  providers: [ DataService]
})
export class SharedModule { }
