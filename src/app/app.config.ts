import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { APP_STORE_PROVIDERS } from './app.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    ...APP_STORE_PROVIDERS,
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
