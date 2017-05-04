import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';

import { SharedModule } from '../shared/shared.module';
import { VisitaEstabelecimentoResumoComponent } from './visita-estabelecimento-resumo/visita-estabelecimento-resumo.component';
import { VisitaEstabelecimentoService } from './visita-estabelecimento.service';

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
    VisitaEstabelecimentoResumoComponent
  ],
  providers: [
    VisitaEstabelecimentoService
  ]
})
export class VisitaEstabelecimentoModule { }
