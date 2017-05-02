import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Estabelecimento } from '../estabelecimento.service';

export interface Filtros {
  pesquisaRapida: Filtro;
  grupoEconomico: Filtro;
  utilizaApp: Filtro;
  antecipacaoAutomatica: Filtro;
  limiteRecarga: Filtro;
  campanhaChurn: Filtro;
  quantidadeMaquinas: Filtro;
}

export interface Filtro {
  label: string;
  valor: string;
  status: FiltroStatus;
  exibirValorNoLabel?: true;
  busca?: boolean;
  valorCustomizado?: boolean;
}

export enum FiltroStatus {
  naoAplicado = -1,
  inativo,
  ativo
}

@Injectable()
export class EstabelecimentoFiltrosService {
  public filtros: BehaviorSubject<Filtros> = new BehaviorSubject<Filtros>({
    pesquisaRapida: {
      label: null,
      valor: '',
      busca: true,
      exibirValorNoLabel: true,
      status: FiltroStatus.naoAplicado
    },
    grupoEconomico: {
      label: null,
      valor: '',
      busca: true,
      exibirValorNoLabel: true,
      status: FiltroStatus.naoAplicado
    },
    utilizaApp: {
      label: 'Utiliza App',
      valor: null,
      status: FiltroStatus.naoAplicado
    },
    antecipacaoAutomatica: {
      label: 'Antecipação automática',
      valor: null,
      status: FiltroStatus.naoAplicado
    },
    limiteRecarga: {
      label: 'Limite de recarga',
      valor: null,
      status: FiltroStatus.naoAplicado
    },
    campanhaChurn: {
      label: 'Campanha churn',
      valor: null,
      status: FiltroStatus.naoAplicado
    },
    quantidadeMaquinas: {
      label: null,
      valor: null,
      exibirValorNoLabel: true,
      valorCustomizado: true,
      status: FiltroStatus.naoAplicado
    },
  });

  public removerFiltros(filtros: string[] | string) {
    const valorFiltros = this.filtros.value;

    if (typeof filtros === 'string') {
      filtros = [filtros];
    }

    filtros.forEach(filter => this.removerFiltroDoObjeto(valorFiltros, filter));

    this.filtros.next(valorFiltros);
  }

  private removerFiltroDoObjeto(objetoFiltros: Filtros, idFiltro: string) {
    const filtro = objetoFiltros[idFiltro];

    if (filtro.busca) {
      filtro.valor = '';
    } else {
      filtro.valor = FiltroStatus.naoAplicado;
    }

    filtro.status = FiltroStatus.naoAplicado;
  }

  public filtrarEstabelecimentos(estabelecimentos: Estabelecimento[], filtros: Filtros) {
    const metodosFiltro = [
      this.filtrarPorPesquisaRapida,
      this.filtrarPorUtilizaApp,
      this.filtrarPorAntecipacaoAutomatica,
      this.filtrarPorLimiteRecarga,
      this.filtrarPorCampanhaChurn,
      this.filtrarPorQuantidadeMaquinas,
      this.filtrarPorGrupo,
    ];

    const estabelecimentosFiltrados = estabelecimentos.filter(estabelecimento => {
      for (const prop in metodosFiltro) {
        if (!metodosFiltro[prop](estabelecimento, filtros)) {
          return false;
        }
      }

      return true;
    });

    return estabelecimentosFiltrados;
  }

  private filtrarPorPesquisaRapida(estabelecimento: Estabelecimento, filtros: Filtros) {
    let valorProp;
    const pesquisaRapida = filtros.pesquisaRapida.valor.toLowerCase();

    for (const prop in estabelecimento) {
      valorProp = estabelecimento[prop];
      if (typeof valorProp === 'string' && (valorProp.toLowerCase().indexOf(pesquisaRapida) >= 0)) {
        return true;
      }
    }

    return false;
  }

  private filtrarPorGrupo(estabelecimento: Estabelecimento, filtros: Filtros) {
    if (!estabelecimento.grupo) {
      return filtros.grupoEconomico.valor === '';
    }

    return estabelecimento.grupo.toLowerCase().indexOf(filtros.grupoEconomico.valor.toLowerCase()) >= 0;
  }

  private filtrarPorUtilizaApp(estabelecimento: Estabelecimento, filtros: Filtros) {
    const utilizaApp = filtros.utilizaApp.status;

    if (utilizaApp === FiltroStatus.naoAplicado) {
      return true;
    }

    return estabelecimento.statusApp === Boolean(utilizaApp);
  }

  private filtrarPorAntecipacaoAutomatica(estabelecimento: Estabelecimento, filtros: Filtros) {
    const antecipacaoAutomatica = filtros.antecipacaoAutomatica.status;

    if (antecipacaoAutomatica === FiltroStatus.naoAplicado) {
      return true;
    }

    return estabelecimento.possuiAntecipacaoAutomatica === Boolean(antecipacaoAutomatica);
  }

  private filtrarPorLimiteRecarga(estabelecimento: Estabelecimento, filtros: Filtros) {
    const limiteRecarga = filtros.limiteRecarga.status;

    if (limiteRecarga === FiltroStatus.naoAplicado) {
      return true;
    }

    if (limiteRecarga === FiltroStatus.ativo) {
      return estabelecimento.limiteCreditoRecarga > 0;
    }

    return estabelecimento.limiteCreditoRecarga === 0;
  }

  private filtrarPorCampanhaChurn(estabelecimento: Estabelecimento, filtros: Filtros) {
    const campanhaChurn = filtros.campanhaChurn.status;

    if (campanhaChurn === FiltroStatus.naoAplicado) {
      return true;
    }

    return estabelecimento.campanhaChurn === Boolean(campanhaChurn);
  }

  private filtrarPorQuantidadeMaquinas(estabelecimento: Estabelecimento, filtros: Filtros) {
    const filtroQuantidadeMaquinas = filtros.quantidadeMaquinas.status;
    const valorQuantidadeMaquinas = parseInt(filtros.quantidadeMaquinas.valor, 10);

    if (filtroQuantidadeMaquinas === FiltroStatus.naoAplicado) {
      return true;
    }

    const totalMaquinas = estabelecimento.qtdMaquinasPOS + estabelecimento.qtdMaquinasTEF;

    if (valorQuantidadeMaquinas < 6) {
      return totalMaquinas === valorQuantidadeMaquinas;
    }

    return totalMaquinas >= valorQuantidadeMaquinas;
  }
}
