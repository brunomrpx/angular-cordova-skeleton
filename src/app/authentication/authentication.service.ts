import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';

import { SessionService } from './session.service';
import { SynchronizationService } from '../synchronization/synchronization.service';
import { CustomerService } from '../customer/customer.service';
import * as localForage from 'localforage';

@Injectable()
export class AuthenticationService {
  constructor(
    private keycloakService: KeycloakService,
    private sessionService: SessionService,
    private synchronizationService: SynchronizationService,
    private customersService: CustomerService
  ) {}

  public logout() {
    const promise = this.sessionService.clear().then(() => {
      this.keycloakService.keycloak.logout();
      this.synchronizationService.setSynchronizationId(null);
      this.customersService.saveCustomers(null);
    });

    return promise;
  }
}
