import { Component } from '@angular/core';

import { HeaderService } from './shared/header/header.service';
import { KeycloakService } from './authentication/keycloak.service';

declare const window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private headerService: HeaderService, private keycloakService: KeycloakService) {
    this.headerService.useSidebar = true;
    this.keycloakService.keycloak = window._keycloak;
  }
}
