import { BluePrintsComponent } from './blue-prints/blue-prints.component';
import { JpgmapsComponent } from './jpgmaps/jpgmaps.component';
import { Cc3mapsComponent } from './cc3maps/cc3maps.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const dlowRoutes: Routes = [
  {path: '', children: [
    {path: 'pcsheet', redirectTo: '/assets/PCsheet2.pdf'},
    {path: 'cc3', component: Cc3mapsComponent},
    {path: 'maps', component: JpgmapsComponent},
    {path: 'blueprints', component: BluePrintsComponent},
    {path: '**', redirectTo: '/', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(dlowRoutes)],
  exports: [RouterModule]
})
export class DlowSectionRoutingModule { }
