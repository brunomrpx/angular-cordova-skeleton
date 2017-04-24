import 'es6-shim';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare const window;

let angularStarted = false;
let keycloakJSONFile = 'assets/keycloak/';

if (environment.production) {
  enableProdMode();
  keycloakJSONFile += 'keycloak.prod.json';
} else {
  keycloakJSONFile += 'keycloak.dev.json';
}

function isCordova() {
  return !(/^http/.test(window.location.protocol));
}

function initKeycloak(JSONFile) {
  console.log('keycloak json file: ', JSONFile);

  window._keycloak = window.Keycloak(JSONFile);

  window._keycloak.init({
    onLoad: 'login-required'
  }).success(authenticated => {
    if (authenticated) {
      window._keycloak.loadUserProfile().success(profile => {
        // bootstrapping angular application
        platformBrowserDynamic().bootstrapModule(AppModule);
        angularStarted = true;
      });
    } else {
      window.location.reload();
    }
  }).error(error => {
    console.error('keycloak init error: ', error);
  });

  window._keycloak.onAuthSuccess = function() {
    if (!angularStarted) {
      return;
    }

    window.location.reload();
  };

  window._keycloak.onAuthLogout = function() {
    window.location.reload();
  };
}

if (isCordova()) {
  window.document.addEventListener('deviceready', () => initKeycloak(keycloakJSONFile), false);
} else {
  initKeycloak(keycloakJSONFile);
}

