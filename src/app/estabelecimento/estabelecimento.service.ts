import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import * as localForage from 'localforage';

import { ESTABELECIMENTOS_STORAGE_ID } from './estabelecimento.constant';

export interface Telefone {
  numero: string;
}

export interface Responsavel {
  nome: string;
  tipo: string;
}

export interface Periodo {
  dataInicio: number;
  valor: number;
  qtdTransacoes: number;
}

export interface Bandeira {
  nome: string;
  status: boolean;
  faturamentoTotal: number;
  qtdTransacoesTotal: number;
  periodos: Periodo[];
}

export interface Trava {
  tipo: string;
  domicilio: number;
  dataFim: number;
}

export interface CanalFaturamento {
  nome: string;
  qtdTransacoes: number;
  valor: number;
}

export interface Recarga {
  nome: string;
  status: boolean;
  faturamentoTotal: number;
  qtdTransacoesTotal: number;
  periodos: Periodo[];
}

export interface Estabelecimento {
  idEstabelecimento: number;
  bairro: string;
  campanhaChurn: boolean;
  cidade: string;
  dataUltimaVisita: string;
  grupo: string;
  limiteCreditoRecarga: number;
  nome: string;
  possuiAntecipacaoAutomatica: boolean;
  qtdMaquinasPOS: number;
  qtdMaquinasTEF: number;
  statusApp: boolean;
  status: string;
  UF: string;
  CEP: string;
  agencia: string;
  CNPJ: string;
  codigo: string;
  complemento: string;
  correntista: boolean;
  dataCredenciamento: string;
  emailCadastrado: string;
  idLogCargaDados: number;
  loginExecutivo: string;
  tipoLogradouro: string;
  tipo: string;
  logradouro: string;
  numero: number;
  numeroECsGrupo: number;
  ramo: string;
  subRamo: string;
  regional: string;
  telefones: Telefone[];
  responsaveis: Responsavel[];
  segmento: string;
  ticketMedio: number;
  faturamentoTotal: number;
  qtdTransacoesTotal: number;
  bandeiras: Bandeira[];
  sow: number;
  sowtermo: number;
  faturamentoTermoCompromisso: number;
  dataVigenciaTermo: number;
  taxaVigenteDebito: number;
  taxaVigenteCreditoAVista: number;
  taxaVigenteCredito2A3: number;
  taxaVigenteCredito4a6: number;
  taxaVigenteCredito7a12: number;
  msgAtencao1: string;
  msgAtencao2: string;
  msgAtencao3: string;
  msgAtencao4: string;
  travas: Trava[];
  agendaDisponivel: number;
  percentualAgendaAntecipado: number;
  faturamentoCanais: CanalFaturamento[];
  possuiRecargaHabilitada: boolean;
  faturamentoTotalRecarga: number;
  limiteCreditoPreAprovadoRecarga: number;
  qtdConsultasApp: number;
  qtdAntecipacoesApp: number;
  qtdSolicitacoesServicosApp: number;
}

@Injectable()
export class EstabelecimentoService {
  public estabelecimentos: BehaviorSubject<Estabelecimento[]> = new BehaviorSubject<Estabelecimento[]>([]);

  constructor() {
    this.getEstabelecimentos().then(estabelecimentos => this.estabelecimentos.next(estabelecimentos));
  }

  public getEstabelecimentosPor(busca: {}, retornarLista = true) {
    return this.getEstabelecimentos().then(estabelecimentos => {
      const filterMethod: string = retornarLista ? 'filter' : 'find';

      const estabelecimentosFiltrados = Array.prototype[filterMethod].call(estabelecimentos, (estabelecimento) => {
        return this.estabelecimentoContemplaBusca(busca, estabelecimento);
      });

      return estabelecimentosFiltrados;
    });
  }

  private estabelecimentoContemplaBusca(busca: {}, estabelecimento: Estabelecimento) {
    for (const prop in busca) {
      if (estabelecimento[prop] !== busca[prop]) {
        return false;
      }
    }

    return true;
  }

  public getEstabelecimentos(): Promise<Estabelecimento[]> {
    return localForage.getItem(ESTABELECIMENTOS_STORAGE_ID);
  }

  public setEstabelecimentos(estabelecimentos: Estabelecimento[]): Promise<Estabelecimento[]> {
    const promise = localForage.setItem(ESTABELECIMENTOS_STORAGE_ID, estabelecimentos);
    promise.then(estabelecimentosSalvos => this.estabelecimentos.next(estabelecimentosSalvos));

    return promise;
  }
}
