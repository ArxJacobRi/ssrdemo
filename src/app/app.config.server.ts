import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting  } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import {HTTP_TRANSFER_CACHE_ORIGIN_MAP} from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting (serverRoutes),
    // {
    //   provide: HTTP_TRANSFER_CACHE_ORIGIN_MAP,
    //   useValue: {
    //     'https://api.open-meteo.com': 'https://external-domain.com'
    //   }
    // }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

