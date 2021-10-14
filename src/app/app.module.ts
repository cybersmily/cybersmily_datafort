import { CommonUiModule } from './shared/modules/common-ui/common-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { ApphomeModule } from './apphome/apphome.module';
import { AppFashionGeneratorModule } from './app-fashion-generator/app-fashion-generator.module';
import { NpcProfileModalComponent } from './shared/modules/npcs/npcProfileModal/npcprofilemodal.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule, AppBootstrapModule } from './shared/modules';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SaveFileService, DataService } from './shared/services/file-services';
import { PipesModule } from './shared/pipes/pipes.module';
import { Cp2020CyberdeckListComponent } from './shared/cp2020/cp2020-netrun-gear/cp2020-cyberdeck-list/cp2020-cyberdeck-list.component';
@NgModule({
  declarations: [
    AppComponent,
    NpcProfileModalComponent,
    Cp2020CyberdeckListComponent
  ],
  imports: [
    AppBootstrapModule,
    CommonUiModule,
    SharedModule,
    HttpClientModule,
    AppFashionGeneratorModule,
    ApphomeModule,
    PipesModule,
    AppRoutingModule /* Keep last as it is important for routing */
  ],
  entryComponents: [NpcProfileModalComponent],
  providers: [
    DataService,
    SaveFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
