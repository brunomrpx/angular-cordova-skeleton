import { Component } from '@angular/core';

import { HeaderService } from './shared/header/header.service';
import { KeycloakService } from './authentication/keycloak.service';
import { SessionService, Session } from './authentication/session.service';
import { SynchronizationService } from './synchronization/synchronization.service';
import { HttpServiceConfig } from './shared/http/http.service';
import { Headers } from '@angular/http';

declare const window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private headerService: HeaderService,
    private keycloakService: KeycloakService,
    private sessionService: SessionService,
    private synchronizationService: SynchronizationService
  ) {
    this.headerService.useSidebar = true;
    this.keycloakService.keycloak = window._keycloak;

    this.keycloakService.keycloak.loadUserInfo().success(userInfo => {
      // creating app session
      const session = {
        createdAt: +new Date(),
        data: userInfo
      };

      this.sessionService.setSession(session);

      // adding keycloak authorization header
      const defaultHeaders = new Headers();
      defaultHeaders.append('Authorization', 'Bearer ' + this.keycloakService.keycloak.token);
      HttpServiceConfig.defaultRequestOptions = { headers: defaultHeaders};

      // synchronizing with server
      this.synchronizationService.download().subscribe(
        result => console.log('synchronization success'),
        error => console.error('synchronization error: ', error)
      );
    });
  }
}
