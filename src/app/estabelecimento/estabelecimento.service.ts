import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import * as localForage from 'localforage';

export interface Telefone {
  numero: string;
}

export interface Responsavel {
  nome: string;
  tipo: string;
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
}

export const ESTABELECIMENTO_ID = 'estabelecimentos';

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
    return localForage.getItem(ESTABELECIMENTO_ID);
  }

  public setEstabelecimentos(estabelecimentos: Estabelecimento[]): Promise<Estabelecimento[]> {
    const promise = localForage.setItem(ESTABELECIMENTO_ID, estabelecimentos);
    promise.then(estabelecimentosSalvos => this.estabelecimentos.next(estabelecimentosSalvos));

    return promise;
  }
}
