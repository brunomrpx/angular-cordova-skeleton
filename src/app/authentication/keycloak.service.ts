import { Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from '../../environments/environment';
import { isCordovaApp } from '../core/cordova';

declare const window;

export function bootstrapWithKeycloak(appModule) {
  let keycloakJSONFile = 'assets/keycloak/';

  if (environment.production) {
    keycloakJSONFile += 'keycloak.prod.json';
  } else {
    keycloakJSONFile += 'keycloak.dev.json';
  }

  if (isCordovaApp) {
    window.document.addEventListener('deviceready', () => initKeycloak(keycloakJSONFile, appModule), false);
  } else {
    initKeycloak(keycloakJSONFile, appModule);
  }
}

function initKeycloak(JSONFile, appModule) {
  console.log('keycloak json file: ', JSONFile);

  let angularStarted = false;

  window._keycloak = window.Keycloak(JSONFile);

  window._keycloak.init({
    onLoad: 'login-required'
  }).success(authenticated => {
    if (authenticated) {
      angularStarted = true;

      platformBrowserDynamic().bootstrapModule(appModule);

      window._keycloak.onAuthSuccess = function () {
        if (!angularStarted) {
          return;
        }

        window.location.reload();
      };

      window._keycloak.onAuthLogout = function () {
        window.location.reload();
      };
    } else {
      window.location.reload();
    }
  }).error(error => {
    console.error('keycloak init error: ', error);
  });
}

@Injectable()
export class KeycloakService {
  private _keycloak: any;

  get keycloak() {
    return this._keycloak;
  }

  set keycloak(keycloak: any) {
    this._keycloak = keycloak;
  }
}
