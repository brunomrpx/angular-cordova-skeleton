import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';

import { SessionService } from './session.service';

@Injectable()
export class AuthenticationService {
  constructor(private keycloakService: KeycloakService, private sessionService: SessionService) {}

  public logout() {
    const promise = this.sessionService.clear().then(() => {
      this.keycloakService.keycloak.logout();
    });

    return promise;
  }
}
