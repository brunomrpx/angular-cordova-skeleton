import { NgModule } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { MenuComponent } from '../shared/menu/menu.component';
import { HeaderComponent } from '../shared/header/header.component';

import { EstabelecimentoListaComponent } from './estabelecimento-lista/estabelecimento-lista.component';
import { EstabelecimentoDetalhesComponent } from './estabelecimento-detalhes/estabelecimento-detalhes.component';
import { EstabelecimentoFiltrosComponent } from './estabelecimento-filtros/estabelecimento-filtros.component';
import { EstabelecimentoListaHeaderComponent } from './estabelecimento-lista/estabelecimento-lista-header/estabelecimento-lista-header.component';

const routes: Routes = [
  {
    path: 'estabelecimento',
    children: [
      {
        path: '',
        component: SidebarComponent,
        children: [
          { path: '', component: EstabelecimentoListaComponent },
          { path: '', component: MenuComponent, outlet: 'menu-left' },
          { path: '', component: EstabelecimentoFiltrosComponent, outlet: 'menu-right' },
          { path: '', component: EstabelecimentoListaHeaderComponent, outlet: 'header', data: { root: true } }
        ]
      },
      {
        path: ':id/detalhes',
        component: SidebarComponent,
        children: [
          { path: '', component: EstabelecimentoDetalhesComponent },
          { path: '', component: HeaderComponent, outlet: 'header', data: { title: 'Detalhes EC' } }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstabelecimentoRoutingModule { }
