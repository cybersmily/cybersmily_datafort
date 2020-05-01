import { ShopGearComponent } from './shop-gear/shop-gear.component';
import { ShopCyberwareComponent } from './shop-cyberware/shop-cyberware.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopOtherComponent } from './shop-other/shop-other.component';

const shopRoutes: Routes = [
  { path: '', children: [
    { path: 'cyber', component: ShopCyberwareComponent},
    { path: 'gear', component: ShopGearComponent},
    { path: 'other', component: ShopOtherComponent},
    { path: '**', redirectTo: '/shop/cyber', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(shopRoutes)],
  exports: [RouterModule]
})
export class ShopSectionRoutingModule { }
