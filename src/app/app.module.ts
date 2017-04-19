import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import 'hammerjs';

import { AppComponent } from './app.component';

import { AuthenticationModule } from '../app/authentication/authentication.module';
import { CustomerModule } from './customer/customer.module';
import { SharedModule } from './shared/shared.module';
import { SynchronizationModule } from './synchronization/synchronization.module';

const routes: Routes = [
  { path: '', redirectTo: 'customer/list', pathMatch: 'full' }, // default route
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
    AuthenticationModule,
    CustomerModule,
    SynchronizationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
