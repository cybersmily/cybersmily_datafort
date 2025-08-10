import { CommonUiModule } from './shared/modules/common-ui/common-ui.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApphomeModule } from './apphome/apphome.module';
import { NpcProfileModalComponent } from './shared/modules/npcs/npcProfileModal/npcprofilemodal.component';
import { AppRoutingModule } from './datafort-routes';
import { SharedModule, AppBootstrapModule } from './shared/modules';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SaveFileService, DataService } from './shared/services/file-services';
import { PipesModule } from './shared/pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';


@NgModule({ declarations: [ NpcProfileModalComponent],
    imports: [
      AppBootstrapModule,
        CommonUiModule,
        SharedModule,
        ApphomeModule,
        PipesModule,
        AppRoutingModule,
        FontAwesomeModule,
        BrowserAnimationsModule
      ],
        providers: [DataService,
          SaveFileService, provideHttpClient(withInterceptorsFromDi()),
          provideAnimationsAsync(),
          providePrimeNG({
            theme: {
              preset: Aura
            }
          })

        ] })
export class AppModule {}
