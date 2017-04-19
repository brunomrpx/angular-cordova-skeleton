import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeycloakService } from './keycloak.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [KeycloakService]
})
export class AuthenticationModule { }
