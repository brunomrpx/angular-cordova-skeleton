import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Customer } from '../customer.service';

export interface Filters {
  pesquisaRapida: string;
  grupoEconomico: string;
  utilizaApp: SelectFilterStatus;
  antecipacaoAutomatica: SelectFilterStatus;
  limiteRecarga: SelectFilterStatus;
  campanhaChurn: SelectFilterStatus;
  quantidadeMaquinas: SelectFilterStatus;
}

export enum SelectFilterStatus {
  notApplied = -1,
  inactive,
  active
}

export interface FiltrosSelecionados {
  mensagem: string;
  status: SelectFilterStatus;
}

export const mensagens: { [key: string]: string } = {
  utilizaApp: 'Utiliza App',
  antecipacaoAutomatica: 'Antecipação automática',
  limiteRecarga: 'Limite de recarga',
  campanhaChurn: 'Campanha churn',
};

@Injectable()
export class CustomerFilterService {
  public filters: BehaviorSubject<Filters> = new BehaviorSubject<Filters>({
    pesquisaRapida: '',
    grupoEconomico: '',
    utilizaApp: SelectFilterStatus.notApplied,
    antecipacaoAutomatica: SelectFilterStatus.notApplied,
    limiteRecarga: SelectFilterStatus.notApplied,
    campanhaChurn: SelectFilterStatus.notApplied,
    quantidadeMaquinas: SelectFilterStatus.notApplied
  });

  public getMensagensFiltrosSelecionados(filters: Filters) {
    const filtrosSelecionados = [];
    const quantidadeMaquinas = parseInt(String(filters.quantidadeMaquinas), 10);
    let valor;

    if (filters.pesquisaRapida !== '') {
      filtrosSelecionados.push({
        filtro: 'pesquisaRapida',
        mensagem: filters.pesquisaRapida,
        status: null
      });
    }

    for (const prop in mensagens) {
      valor = parseInt(String(filters[prop]), 10);

      if (valor !== SelectFilterStatus.notApplied) {
        filtrosSelecionados.push({
          filtro: prop,
          mensagem: mensagens[prop],
          status: filters[prop]
        });
      }
    }

    if (quantidadeMaquinas !== SelectFilterStatus.notApplied) {
      let mensagem = '6 máquinas ou mais';

      if (quantidadeMaquinas < 6) {
        mensagem = `${quantidadeMaquinas} máquina`;
        if (quantidadeMaquinas > 1) {
          mensagem += 's';
        }
      }

      filtrosSelecionados.push({
        filtro: 'quantidadeMaquinas',
        mensagem: mensagem,
        status: null
      });
    }

    if (filters.grupoEconomico !== '') {
      filtrosSelecionados.push({
        filtro: 'grupoEconomico',
        mensagem: filters.grupoEconomico,
        status: null
      });
    }

    return filtrosSelecionados;
  }

  public filterCustomers(customers: Customer[], filters: Filters) {
    const filtros = [
      this.filtrarPorPesquisaRapida,
      this.filtrarPorUtilizaApp,
      this.filtrarPorAntecipacaoAutomatica,
      this.filtrarPorLimiteRecarga,
      this.filtrarPorCampanhaChurn,
      this.filtrarPorQuantidadeMaquinas,
      this.filtrarPorGrupo,
    ];

    const filteredCustomers = customers.filter(customer => {
      for (const prop in filtros) {
        if (!filtros[prop](customer, filters)) {
          return false;
        }
      }

      return true;
    });

    return filteredCustomers;
  }

  private filtrarPorPesquisaRapida(customer: Customer, filtros: Filters) {
    let propValue;
    const pesquisaRapida = filtros.pesquisaRapida.toLowerCase();

    for (const prop in customer) {
      propValue = customer[prop];
      if (typeof propValue === 'string' && (propValue.toLowerCase().indexOf(pesquisaRapida) >= 0)) {
        return true;
      }
    }

    return false;
  }

  private filtrarPorGrupo(customer: Customer, filtros: Filters) {
    if (!customer.grupo) {
      return filtros.grupoEconomico === '';
    }

    return customer.grupo.toLowerCase().indexOf(filtros.grupoEconomico.toLowerCase()) >= 0;
  }

  private filtrarPorUtilizaApp(customer: Customer, filtros: Filters) {
    const utilizaApp = parseInt(String(filtros.utilizaApp), 10);

    if (utilizaApp === SelectFilterStatus.notApplied) {
      return true;
    }

    return customer.statusApp === Boolean(utilizaApp);
  }

  private filtrarPorAntecipacaoAutomatica(customer: Customer, filtros: Filters) {
    const antecipacaoAutomatica = parseInt(String(filtros.antecipacaoAutomatica), 10);

    if (antecipacaoAutomatica === SelectFilterStatus.notApplied) {
      return true;
    }

    return customer.possuiAntecipacaoAutomatica === Boolean(antecipacaoAutomatica);
  }

  private filtrarPorLimiteRecarga(customer: Customer, filtros: Filters) {
    const limiteRecarga = parseInt(String(filtros.limiteRecarga), 10);

    if (limiteRecarga === SelectFilterStatus.notApplied) {
      return true;
    }

    if (limiteRecarga === SelectFilterStatus.active) {
      return customer.limiteCreditoRecarga > 0;
    }

    return customer.limiteCreditoRecarga === 0;
  }

  private filtrarPorCampanhaChurn(customer: Customer, filtros: Filters) {
    const campanhaChurn = parseInt(String(filtros.campanhaChurn), 10);

    if (campanhaChurn === SelectFilterStatus.notApplied) {
      return true;
    }

    return customer.campanhaChurn === Boolean(campanhaChurn);
  }

  private filtrarPorQuantidadeMaquinas(customer: Customer, filtros: Filters) {
    const filtroQuantidadeMaquinas = parseInt(String(filtros.quantidadeMaquinas), 10);

    if (filtroQuantidadeMaquinas === SelectFilterStatus.notApplied) {
      return true;
    }

    const totalMaquinas = customer.qtdMaquinasPOS + customer.qtdMaquinasTEF;

    if (filtroQuantidadeMaquinas < 6) {
      return totalMaquinas === filtroQuantidadeMaquinas;
    }

    return totalMaquinas >= filtros.quantidadeMaquinas;
  }
}
