import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporationsComponent } from './corporations/corporations.component';
import { NpcsComponent } from './npcs/npcs.component';

const peepRoutes: Routes = [
  {path: '', children: [
    {path: 'corp', component: CorporationsComponent},
    {path: 'copscorps', component: NpcsComponent },
    {path: 'fixermedia', component: NpcsComponent },
    {path: 'medtechnr', component: NpcsComponent },
    {path: 'nomadrocker', component: NpcsComponent },
    {path: 'solotechie', component: NpcsComponent },
    {path: '**', redirectTo: '/', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(peepRoutes)],
  exports: [RouterModule]
})
export class PeepSectionRoutingModule { }
