import 'es6-shim';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

declare const window;

window.document.addEventListener('deviceready', () => {
  window._keycloak = window.Keycloak('assets/keycloak/keycloak.json');

  window._keycloak.init({
    onLoad: 'login-required'
  }).success(authenticated => {
    if (authenticated) {
      window._keycloak.loadUserProfile().success(profile => {
        // bootstrapping angular application
        platformBrowserDynamic().bootstrapModule(AppModule);
      });
    } else {
      window.location.reload();
    }
  }).error(error => {
    window.location.reload();
  });
}, false);

