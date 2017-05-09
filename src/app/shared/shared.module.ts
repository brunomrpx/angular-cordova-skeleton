import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { ListagemPeriodosComponent } from './listagem-periodos/listagem-periodos.component';

@NgModule({
  declarations: [
    ListagemPeriodosComponent
  ],
  exports: [
    ListagemPeriodosComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class SharedModule { }
