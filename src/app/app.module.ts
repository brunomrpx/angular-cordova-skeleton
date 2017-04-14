import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import 'hammerjs';

import { AppComponent } from './app.component';

import { LoginModule } from '../app/login/login.module';
import { CustomerModule } from './customer/customer.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default route
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
    SharedModule,
    LoginModule,
    CustomerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
