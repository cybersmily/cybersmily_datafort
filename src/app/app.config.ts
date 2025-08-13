import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { cybersmilyPrimeNGPreset } from './shared/models/csPrimeNGPresets';
import { SaveFileService } from './shared/services/file-services';
import {
  provideHttpClient,
} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideAnimations } from '@angular/platform-browser/animations';

import { mainRoutes } from './datafort-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
      FontAwesomeModule,
    ),
    SaveFileService,
    provideRouter(mainRoutes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: cybersmilyPrimeNGPreset,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
  ],
};
