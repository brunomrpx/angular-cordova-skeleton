import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { MenuComponent } from '../shared/menu/menu.component';
import { HeaderComponent } from '../shared/header/header.component';

import { SharedModule } from '../shared/shared.module';
import { EstabelecimentoListaComponent } from './estabelecimento-lista/estabelecimento-lista.component';
import { EstabelecimentoDetalhesComponent } from './estabelecimento-detalhes/estabelecimento-detalhes.component';
import { EstabelecimentoFiltrosComponent } from './estabelecimento-filtros/estabelecimento-filtros.component';
import { EstabelecimentoListaHeaderComponent } from './estabelecimento-lista/estabelecimento-lista-header/estabelecimento-lista-header.component';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoFiltrosService } from './estabelecimento-filtros/estabelecimento-filtros.service';
import { DadosCadastraisComponent } from './estabelecimento-detalhes/dados-cadastrais/dados-cadastrais.component';
import { MaquinasInstaladasComponent } from './estabelecimento-detalhes/maquinas-instaladas/maquinas-instaladas.component';
import { FaturamentoTotalComponent } from './estabelecimento-detalhes/faturamento-total/faturamento-total.component';
import { FaturamentoMensalComponent } from './estabelecimento-detalhes/faturamento-mensal/faturamento-mensal.component';
import { TaxasVigentesComponent } from './estabelecimento-detalhes/taxas-vigentes/taxas-vigentes.component';
import { AntecipacaoAutomaticaComponent } from './estabelecimento-detalhes/antecipacao-automatica/antecipacao-automatica.component';
import { UtilizaAppComponent } from './estabelecimento-detalhes/utiliza-app/utiliza-app.component';
import { RecargaHabilitadaComponent } from './estabelecimento-detalhes/recarga-habilitada/recarga-habilitada.component';

const routes: Routes = [
  {
    path: 'estabelecimento',
    children: [
      {
        path: 'lista',
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
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EstabelecimentoListaComponent,
    EstabelecimentoDetalhesComponent,
    EstabelecimentoFiltrosComponent,
    EstabelecimentoListaHeaderComponent,
    DadosCadastraisComponent,
    MaquinasInstaladasComponent,
    FaturamentoTotalComponent,
    FaturamentoMensalComponent,
    TaxasVigentesComponent,
    AntecipacaoAutomaticaComponent,
    UtilizaAppComponent,
    RecargaHabilitadaComponent
  ],
  providers: [
    EstabelecimentoService,
    EstabelecimentoFiltrosService
  ]
})
export class EstabelecimentoModule { }
