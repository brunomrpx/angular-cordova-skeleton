import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { SidebarService } from '../../core/sidebar/sidebar.service';
import { HttpService } from '../../core/http/http.service';
import { EstabelecimentoService, Estabelecimento } from '../estabelecimento.service';
import { EstabelecimentoFiltrosService, Filtros, Filtro, FiltroStatus } from '../estabelecimento-filtros/estabelecimento-filtros.service';
import { ArrayService, SortOrder } from '../../core/array.service';

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
  private sortOrder = SortOrder;
  private ordenacaoAtual = {
    campo: null,
    ordem: null
  };

  constructor(
    private sidebarService: SidebarService,
    private estabelecimentoService: EstabelecimentoService,
    private estabelecimentoFltrosService: EstabelecimentoFiltrosService,
    private arrayService: ArrayService
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

  private ordenarPor(campo: string, tipo: string = 'string') {
    let ordem = SortOrder.ASC;

    if (this.ordenacaoAtual.campo === campo) {
      if (this.ordenacaoAtual.ordem === SortOrder.ASC) {
        ordem = SortOrder.DESC;
      }
    }

    this.ordenacaoAtual = { campo, ordem };

    this.arrayService.sort(this.estabelecimentos, campo, tipo, ordem);

    const filtros = this.estabelecimentoFltrosService.filtros.value;
    this.estabelecimentosFiltrados = this.estabelecimentoFltrosService.filtrarEstabelecimentos(this.estabelecimentos, filtros);
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
