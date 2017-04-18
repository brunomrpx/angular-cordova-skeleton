import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './sidebar/sidebar.service';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import { MenuComponent } from './menu/menu.component';
import { KeycloakService } from './keycloak.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent
  ],
  declarations: [
    SidebarComponent,
    HeaderComponent,
    MenuComponent
  ],
  providers: [
    SidebarService,
    HeaderService,
    KeycloakService
  ]
})
export class SharedModule { }
