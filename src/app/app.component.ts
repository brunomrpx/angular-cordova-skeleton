import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Headers } from '@angular/http';

import { HeaderService } from './core/header/header.service';
import { KeycloakService } from './authentication/keycloak.service';
import { SessionService, Session } from './authentication/session.service';
import { SincronizacaoService } from './sincronizacao/sincronizacao.service';
import { HttpServiceConfig } from './core/http/http.service';
import { useKeycloak } from '../environments/environment';
import { isCordovaApp } from './core/cordova';

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
    private sincronizacaoService: SincronizacaoService,
    private router: Router
  ) {
    this.headerService.useSidebar = true;
    this.keycloakService.keycloak = window._keycloak;

    // scroll to top on page transition
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      const bodyHeight = document.body.style.height;

      document.body.style.height = 'auto';

      window.scroll(0, 0);

      setTimeout(() => document.body.style.height = bodyHeight, 500);
    });

    let initPromise: any = Promise.resolve({});

    if (useKeycloak) {
      initPromise = new Promise((resolve, reject) => {
        this.keycloakService.keycloak.loadUserInfo().success(resolve).error(reject);
      });

      // adding keycloak authorization header
      const defaultHeaders = new Headers();
      defaultHeaders.append('Authorization', 'Bearer ' + this.keycloakService.keycloak.token);
      HttpServiceConfig.defaultRequestOptions = { headers: defaultHeaders };
    }

    initPromise.then(userInfo => {
      console.log('user info: ', userInfo);

      // creating app session
      const session = {
        createdAt: +new Date(),
        data: userInfo
      };

      this.sessionService.setSession(session);

      // synchronizing with server
      this.sincronizacaoService.download().subscribe(
        result => console.log('synchronization success'),
        error => console.error('synchronization error: ', error)
      );
    });
  }
}
