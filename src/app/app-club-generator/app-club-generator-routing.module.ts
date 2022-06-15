import { ClubGeneratorMainComponent } from './club-generator-main/club-generator-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const clubRoutes: Routes = [
  {
    path: '',
    component: ClubGeneratorMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(clubRoutes)],
  exports: [RouterModule],
})
export class AppClubGeneratorRoutingModule {}
