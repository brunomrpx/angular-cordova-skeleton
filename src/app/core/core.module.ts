import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './sidebar/sidebar.service';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import { MenuComponent } from './menu/menu.component';
import { HttpService } from './http/http.service';
import { CollapseContentComponent } from './collapse-content/collapse-content.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FABComponent } from './fab/fab.component';
import { ArrayService } from './array.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    CollapseContentComponent,
    AlertMessageComponent,
    CheckboxComponent,
    FABComponent
  ],
  declarations: [
    SidebarComponent,
    HeaderComponent,
    MenuComponent,
    CollapseContentComponent,
    AlertMessageComponent,
    CheckboxComponent,
    FABComponent
  ],
  providers: [
    SidebarService,
    HeaderService,
    HttpService,
    ArrayService
  ]
})
export class CoreModule { }
