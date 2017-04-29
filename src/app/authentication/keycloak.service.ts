import { Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from '../../environments/environment';
import { isCordovaApp } from '../shared/cordova';

declare const window;

export function bootstrapWithKeycloak(appModule) {
  let angularStarted = false;
  let keycloakJSONFile = 'assets/keycloak/';

  if (environment.production) {
    keycloakJSONFile += 'keycloak.prod.json';
  } else {
    keycloakJSONFile += 'keycloak.dev.json';
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
          platformBrowserDynamic().bootstrapModule(appModule);
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

  if (isCordovaApp) {
    window.document.addEventListener('deviceready', () => initKeycloak(keycloakJSONFile), false);
  } else {
    initKeycloak(keycloakJSONFile);
  }
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
