import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './polyfills'; 
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs'; 



enableProdMode();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)
  );


const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

