import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { SidebarService } from '../../shared/sidebar/sidebar.service';
import { HttpService } from '../../shared/http/http.service';
import { EstabelecimentoService, Estabelecimento } from '../estabelecimento.service';
import { EstabelecimentoFiltrosService, Filtros, Filtro, FiltroStatus } from '../estabelecimento-filtros/estabelecimento-filtros.service';

interface FiltroSelecionado extends Filtro {
  id: string;
}

@Component({
  selector: 'app-estabelecimento-lista',
  templateUrl: './estabelecimento-lista.component.html',
  styleUrls: ['./estabelecimento-lista.component.less']
})
export class EstabelecimentoListaComponent implements OnInit {
  private estabelecimentos: Estabelecimento[] = [];
  private estabelecimentosFiltrados: Estabelecimento[] = [];
  private filtrosSelecionados: FiltroSelecionado[] = [];
  private filtroStatus = FiltroStatus;

  constructor(
    private sidebarService: SidebarService,
    private estabelecimentoService: EstabelecimentoService,
    private estabelecimentoFltrosService: EstabelecimentoFiltrosService
  ) {}

  ngOnInit() {
    this.estabelecimentoService.estabelecimentos.subscribe(estabelecimentos => {
      this.estabelecimentos = estabelecimentos;
      this.estabelecimentosFiltrados = estabelecimentos;
    });

    this.estabelecimentoFltrosService.filtros.subscribe(filtros => {
      this.filtrosSelecionados = this.getFiltrosSelecionados(filtros);
      this.estabelecimentosFiltrados = this.estabelecimentoFltrosService.filtrarEstabelecimentos(this.estabelecimentos, filtros);
    });
  }

  private getFiltrosSelecionados(filtros: Filtros) {
    const filtrosSelecionados: FiltroSelecionado[] = [];

    for (const prop in filtros) {
      if (filtros[prop].status !== FiltroStatus.naoAplicado) {
        filtrosSelecionados.push({
          id: prop,
          ...filtros[prop]
        });
      }
    }

    return filtrosSelecionados;
  }

  private removerFiltro(filtroSelecionado: FiltroSelecionado) {
    this.estabelecimentoFltrosService.removerFiltros(filtroSelecionado.id);
  }
}
