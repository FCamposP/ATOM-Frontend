import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AppConfig } from './formio-config';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { authInterceptor } from 'src/app/core/interceptors/auth-interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DialogService, useValue: AppConfig },
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    provideAnimations(),
    MessageService
  ]
};
