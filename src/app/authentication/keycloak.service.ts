import { Injectable } from '@angular/core';

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
