import { CPRedLifePathService } from './../shared/cpred/c-p-red-lifepath/services/c-p-red-life-path.service';
import { CpRedDateGeneratorService } from './services/cp-red-date-generator/cp-red-date-generator.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DiceService } from './../shared/services/dice/dice.service';
import { DataService } from './../shared/services/file-services/dataservice/data.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCpRedDatingRoutingModule } from './app-cp-red-dating-routing.module';
import { CpRedDatingFormComponent } from './cp-red-dating-form/cp-red-dating-form.component';


@NgModule({ declarations: [
        CpRedDatingFormComponent
    ], imports: [CommonModule,
        AppCpRedDatingRoutingModule,
        CommonUiModule], providers: [
        DataService,
        DiceService,
        CpRedDateGeneratorService,
        CPRedLifePathService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppCpRedDatingModule { }
