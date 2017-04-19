import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeycloakService } from './keycloak.service';
import { AuthenticationService } from './authentication.service';
import { SessionService } from './session.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    KeycloakService,
    AuthenticationService,
    SessionService
  ]
})
export class AuthenticationModule { }
