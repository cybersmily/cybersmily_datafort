import { ClubGeneratorModule } from './../shared/modules/club-generator/club-generator.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppClubGeneratorRoutingModule } from './app-club-generator-routing.module';
import { ClubGeneratorMainComponent } from './club-generator-main/club-generator-main.component';

@NgModule({
  declarations: [ClubGeneratorMainComponent],
  imports: [CommonModule, AppClubGeneratorRoutingModule, ClubGeneratorModule],
})
export class AppClubGeneratorModule {}
