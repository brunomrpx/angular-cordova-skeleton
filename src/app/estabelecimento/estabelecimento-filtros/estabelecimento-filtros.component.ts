import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EstabelecimentoFiltrosService, Filtros, FiltroStatus, Filtro } from './estabelecimento-filtros.service';

@Component({
  selector: 'app-estabelecimento-filtros',
  templateUrl: './estabelecimento-filtros.component.html',
  styleUrls: ['./estabelecimento-filtros.component.less']
})
export class EstabelecimentoFiltrosComponent {
  private formGroup: FormGroup;
  private filtroStatus = FiltroStatus;
  private alteracoesLocais = false;

  constructor(private estabelecimentosFiltrosService: EstabelecimentoFiltrosService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      pesquisaRapida: [''],
      grupoEconomico: [''],
      utilizaApp: [FiltroStatus.naoAplicado],
      antecipacaoAutomatica: [FiltroStatus.naoAplicado],
      limiteRecarga: [FiltroStatus.naoAplicado],
      campanhaChurn: [FiltroStatus.naoAplicado],
      quantidadeMaquinas: [FiltroStatus.naoAplicado],
      agendaDisponivel: [FiltroStatus.naoAplicado]
    });

    this.formGroup.valueChanges.subscribe(this.atualizarFiltros.bind(this));
    this.estabelecimentosFiltrosService.filtros.subscribe(this.atualizarFormulario.bind(this));
  }

  private atualizarFormulario(filtros: Filtros) {
    if (this.alteracoesLocais) {
      this.alteracoesLocais = false;
      return;
    }

    this.alteracoesLocais = true;

    const mudancas = {};

    for (const prop in filtros) {
      if (filtros[prop].valor !== null) {
        mudancas[prop] = filtros[prop].valor;
      } else {
        mudancas[prop] = filtros[prop].status;
      }
    }

    this.formGroup.patchValue(mudancas);
  }

  private atualizarFiltros(dadosFormulario) {
    if (this.alteracoesLocais) {
      this.alteracoesLocais = false;
      return;
    }

    this.alteracoesLocais = true;

    const filtros = this.estabelecimentosFiltrosService.filtros.value;
    let filtro, valor;

    for (const prop in dadosFormulario) {
      filtro = filtros[prop];
      valor = dadosFormulario[prop];

      this.atualizarStatusFiltro(filtro, valor);

      if (filtro.exibirValorNoLabel) {
        filtro.label = valor;
      }

      filtro.valor = valor;
    }

    this.estabelecimentosFiltrosService.filtros.next(filtros);
  }

  private atualizarStatusFiltro(filtro: Filtro, valor) {
    if (filtro.busca) {
      if (valor === '') {
        filtro.status = FiltroStatus.naoAplicado;
      } else {
        filtro.status = FiltroStatus.ativo;
      }
    } else if (filtro.valorCustomizado) {
      if (parseInt(valor, 10) === FiltroStatus.naoAplicado) {
        filtro.status = FiltroStatus.naoAplicado;
      } else {
        filtro.status = FiltroStatus.ativo;
      }
    } else {
      filtro.status = parseInt(valor, 10);
    }
  }

  public removerFiltros() {
    const filtros = this.estabelecimentosFiltrosService.filtros.value;
    const filtrosIds = Object.keys(filtros);

    this.estabelecimentosFiltrosService.removerFiltros(filtrosIds);
  }
}
