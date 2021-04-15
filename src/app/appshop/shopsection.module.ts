import { Cp2020CyberwareModule } from './../shared/cp2020/cp2020-cyberware/cp2020-cyberware.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopSectionRoutingModule } from './shopsection-routing.module';
import { ShopCyberwareComponent } from './shop-cyberware/shop-cyberware.component';
import { ShopGearComponent } from './shop-gear/shop-gear.component';
import { ShopOtherComponent } from './shop-other/shop-other.component';

import { GearModule } from './../shared/modules/gear/gear.module';

@NgModule({
  imports: [
    CommonModule,
    Cp2020CyberwareModule,
    GearModule,
    ShopSectionRoutingModule
  ],
  declarations: [
    ShopCyberwareComponent,
    ShopGearComponent,
    ShopOtherComponent ]
})
export class ShopSectionModule { }
