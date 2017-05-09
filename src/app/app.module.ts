import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AuthenticationModule } from '../app/authentication/authentication.module';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { SincrionizacaoModule } from './sincronizacao/sincronizacao.module';
import { VisitaEstabelecimentoModule } from './visita-estabelecimento/visita-estabelecimento.module';

const routes: Routes = [
  { path: '', redirectTo: 'estabelecimento/lista', pathMatch: 'full' }, // default route
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
    CoreModule,
    AuthenticationModule,
    EstabelecimentoModule,
    SincrionizacaoModule,
    VisitaEstabelecimentoModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
