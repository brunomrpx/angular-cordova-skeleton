import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './sidebar/sidebar.service';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import { MenuComponent } from './menu/menu.component';

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
    HeaderService
  ]
})
export class SharedModule { }
