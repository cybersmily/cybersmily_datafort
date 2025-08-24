import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaxmetalRoutingModule } from './app-maxmetal-routing.module';
import { MaxMetalDataService } from './../shared/cp2020/cp2020-vehicles/services';
import { MmgeneratorComponent } from './mmgenerator/mmgenerator.component';
import { MmbuilderComponent } from './mmbuilder/mmbuilder.component';
import { MmdetailsComponent } from './mmdetails/mmdetails.component';
import { MmaccessoriesComponent } from './mmaccessories/mmaccessories.component';
import { MminputComponent } from './mminput/mminput.component';
import { MaxmetalService } from '../shared/cp2020/cp2020-vehicles/services';
import { MmweaponComponent } from './mmweapon/mmweapon.component';
import { MmoptionComponent } from './mmoption/mmoption.component';
import { MmmountComponent } from './mmmount/mmmount.component';
import { MmmountsComponent } from './mmmounts/mmmounts.component';
import { MmweaponlistComponent } from './mmweaponlist/mmweaponlist.component';
import { MmweaponformComponent } from './mmweaponform/mmweaponform.component';
import { MmoptionsformComponent } from './mmoptionsform/mmoptionsform.component';
import { MmoptionslistComponent } from './mmoptionslist/mmoptionslist.component';
import { LongpressDirective } from '../shared/directives/longpress.directive';
import { BsModalService } from 'ngx-bootstrap/modal';

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
    MaxMetalDataService,
    BsModalService
  ]
})
export class AppMaxmetalModule { }
