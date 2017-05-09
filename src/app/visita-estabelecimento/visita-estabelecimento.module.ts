import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from '../core/sidebar/sidebar.component';
import { HeaderComponent } from '../core/header/header.component';

import { CoreModule } from '../core/core.module';
import { VisitaEstabelecimentoResumoComponent } from './visita-estabelecimento-resumo/visita-estabelecimento-resumo.component';
import { VisitaEstabelecimentoService } from './visita-estabelecimento.service';
import { VisitaEstabelecimentoQuestionarioComponent } from './visita-estabelecimento-questionario/visita-estabelecimento-questionario.component';

const routes: Routes = [
  {
    path: 'visita-estabelecimento/:id',
    children: [
      {
        path: 'resumo',
        component: SidebarComponent,
        children: [
          { path: '', component: VisitaEstabelecimentoResumoComponent },
          { path: '', component: HeaderComponent, outlet: 'header', data: { title: 'Questionário' } }
        ]
      },
      {
        path: 'questionario',
        component: SidebarComponent,
        children: [
          { path: '', component: VisitaEstabelecimentoQuestionarioComponent },
          { path: '', component: HeaderComponent, outlet: 'header' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CoreModule
  ],
  declarations: [
    VisitaEstabelecimentoResumoComponent,
    VisitaEstabelecimentoQuestionarioComponent
  ],
  providers: [
    VisitaEstabelecimentoService
  ]
})
export class VisitaEstabelecimentoModule { }
