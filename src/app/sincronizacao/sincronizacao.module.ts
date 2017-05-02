import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SincronizacaoService } from './sincronizacao.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SincronizacaoService
  ]
})
export class SincrionizacaoModule { }
