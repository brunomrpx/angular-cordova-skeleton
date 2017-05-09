import 'es6-shim';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment, useKeycloak } from './environments/environment';
import { bootstrapWithKeycloak } from './app/authentication/keycloak.service';
import { bindCordovaEvents, isCordovaApp } from './app/core/cordova';

if (environment.production) {
  enableProdMode();
}

if (isCordovaApp) {
  bindCordovaEvents();
}

if (useKeycloak) {
  bootstrapWithKeycloak(AppModule);
} else {
  platformBrowserDynamic().bootstrapModule(AppModule);
}

