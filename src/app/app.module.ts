import { CommonUiModule } from './shared/modules/common-ui/common-ui.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApphomeModule } from './apphome/apphome.module';
import { NpcProfileModalComponent } from './shared/modules/npcs/npcProfileModal/npcprofilemodal.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule, AppBootstrapModule } from './shared/modules';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SaveFileService, DataService } from './shared/services/file-services';
import { PipesModule } from './shared/pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
@NgModule({ declarations: [AppComponent, NpcProfileModalComponent],
    bootstrap: [AppComponent], imports: [AppBootstrapModule,
        CommonUiModule,
        SharedModule,
        ApphomeModule,
        PipesModule,
        AppRoutingModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            maxAge: 4,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([]) /* Keep last as it is important for routing */], providers: [DataService, SaveFileService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
