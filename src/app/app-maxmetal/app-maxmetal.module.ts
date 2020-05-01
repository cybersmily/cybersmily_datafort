import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionModule, CollapseModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaxmetalRoutingModule } from './app-maxmetal-routing.module';
import { MaxMetalDataService } from './../shared/services/maxmetal/max-metal-data.service';
import { MmgeneratorComponent } from './mmgenerator/mmgenerator.component';
import { MmbuilderComponent } from './mmbuilder/mmbuilder.component';
import { MmdetailsComponent } from './mmdetails/mmdetails.component';
import { MmaccessoriesComponent } from './mmaccessories/mmaccessories.component';
import { MminputComponent } from './mminput/mminput.component';
import { MaxmetalService } from '../shared/services/maxmetal/maxmetal.service';
import { MmweaponComponent } from './mmweapon/mmweapon.component';
import { MmoptionComponent } from './mmoption/mmoption.component';
import { MmmountComponent } from './mmmount/mmmount.component';
import { MmmountsComponent } from './mmmounts/mmmounts.component';
import { MmweaponlistComponent } from './mmweaponlist/mmweaponlist.component';
import { MmweaponformComponent } from './mmweaponform/mmweaponform.component';
import { MmoptionsformComponent } from './mmoptionsform/mmoptionsform.component';
import { MmoptionslistComponent } from './mmoptionslist/mmoptionslist.component';
import { LongpressDirective } from '../shared/directives/longpress.directive';

@NgModule({
  imports: [
    CommonModule,
    AppMaxmetalRoutingModule,
    FormsModule,
    AccordionModule,
    CollapseModule,
    FontAwesomeModule
  ],
  declarations: [
    MmgeneratorComponent,
    MmbuilderComponent,
    MmdetailsComponent,
    MmaccessoriesComponent,
    MminputComponent,
    MmweaponComponent,
    MmoptionComponent,
    MmmountComponent,
    MmmountsComponent,
    MmweaponlistComponent,
    MmweaponformComponent,
    MmoptionsformComponent,
    MmoptionslistComponent,
    LongpressDirective
  ],
  providers: [
    MaxmetalService,
    MaxMetalDataService
  ]
})
export class AppMaxmetalModule { }
