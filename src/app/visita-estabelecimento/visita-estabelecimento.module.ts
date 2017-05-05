import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';

import { SharedModule } from '../shared/shared.module';
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
    SharedModule
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
