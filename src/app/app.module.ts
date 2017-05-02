import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import 'hammerjs';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from '../app/authentication/authentication.module';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { SincrionizacaoModule } from './sincronizacao/sincronizacao.module';

const routes: Routes = [
  { path: '', redirectTo: 'estabelecimento', pathMatch: 'full' }, // default route
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
    SharedModule,
    AuthenticationModule,
    EstabelecimentoModule,
    SincrionizacaoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
