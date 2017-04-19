import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class AuthenticationService {
  constructor(private keycloakService: KeycloakService) {}

  public logout() {
    this.keycloakService.keycloak.logout();
  }
}
