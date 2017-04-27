import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './sidebar/sidebar.service';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import { MenuComponent } from './menu/menu.component';
import { HttpService } from './http/http.service';
import { CollapseContentComponent } from './collapse-content/collapse-content.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    CollapseContentComponent
  ],
  declarations: [
    SidebarComponent,
    HeaderComponent,
    MenuComponent,
    CollapseContentComponent
  ],
  providers: [
    SidebarService,
    HeaderService,
    HttpService
  ]
})
export class SharedModule { }
