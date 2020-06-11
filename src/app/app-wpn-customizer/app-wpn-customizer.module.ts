import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WpnCustomizerMainComponent } from './wpn-customizer-main/wpn-customizer-main.component';
import { AppWpnCustomizerRoutingModule } from './app-wpn-customizer-routing.module';



@NgModule({
  declarations: [WpnCustomizerMainComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    AppWpnCustomizerRoutingModule
  ]
})
export class AppWpnCustomizerModule { }
