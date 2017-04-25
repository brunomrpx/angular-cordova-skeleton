import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Customer } from '../customer.service';

export interface Filters {
  pesquisaRapida: Filter;
  grupoEconomico: Filter;
  utilizaApp: Filter;
  antecipacaoAutomatica: Filter;
  limiteRecarga: Filter;
  campanhaChurn: Filter;
  quantidadeMaquinas: Filter;
}

export interface Filter {
  label: string;
  value: string;
  status: SelectFilterStatus;
  showValueAsLabel?: true;
  search?: boolean;
  customValue?: boolean;
}

export enum SelectFilterStatus {
  notApplied = -1,
  inactive,
  active
}

@Injectable()
export class CustomerFilterService {
  public filters: BehaviorSubject<Filters> = new BehaviorSubject<Filters>({
    pesquisaRapida: {
      label: null,
      value: '',
      search: true,
      showValueAsLabel: true,
      status: SelectFilterStatus.notApplied
    },
    grupoEconomico: {
      label: null,
      value: '',
      search: true,
      showValueAsLabel: true,
      status: SelectFilterStatus.notApplied
    },
    utilizaApp: {
      label: 'Utiliza App',
      value: null,
      status: SelectFilterStatus.notApplied
    },
    antecipacaoAutomatica: {
      label: 'Antecipação automática',
      value: null,
      status: SelectFilterStatus.notApplied
    },
    limiteRecarga: {
      label: 'Limite de recarga',
      value: null,
      status: SelectFilterStatus.notApplied
    },
    campanhaChurn: {
      label: 'Campanha churn',
      value: null,
      status: SelectFilterStatus.notApplied
    },
    quantidadeMaquinas: {
      label: null,
      value: null,
      showValueAsLabel: true,
      customValue: true,
      status: SelectFilterStatus.notApplied
    },
  });

  public removeFilters(filters: string[] | string) {
    const filtersValue = this.filters.value;

    if (typeof filters === 'string') {
      filters = [filters];
    }

    filters.forEach(filter => this.removeFilterFromObject(filtersValue, filter));

    this.filters.next(filtersValue);
  }

  public removeFilterFromObject(filtersObject: Filters, filterId: string) {
    const filter = filtersObject[filterId];

    if (filter.search) {
      filter.value = '';
    } else {
      filter.value = SelectFilterStatus.notApplied;
    }

    filter.status = SelectFilterStatus.notApplied;
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
    const pesquisaRapida = filtros.pesquisaRapida.value.toLowerCase();

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
      return filtros.grupoEconomico.value === '';
    }

    return customer.grupo.toLowerCase().indexOf(filtros.grupoEconomico.value.toLowerCase()) >= 0;
  }

  private filtrarPorUtilizaApp(customer: Customer, filtros: Filters) {
    const utilizaApp = filtros.utilizaApp.status;

    if (utilizaApp === SelectFilterStatus.notApplied) {
      return true;
    }

    return customer.statusApp === Boolean(utilizaApp);
  }

  private filtrarPorAntecipacaoAutomatica(customer: Customer, filtros: Filters) {
    const antecipacaoAutomatica = filtros.antecipacaoAutomatica.status;

    if (antecipacaoAutomatica === SelectFilterStatus.notApplied) {
      return true;
    }

    return customer.possuiAntecipacaoAutomatica === Boolean(antecipacaoAutomatica);
  }

  private filtrarPorLimiteRecarga(customer: Customer, filtros: Filters) {
    const limiteRecarga = filtros.limiteRecarga.status;

    if (limiteRecarga === SelectFilterStatus.notApplied) {
      return true;
    }

    if (limiteRecarga === SelectFilterStatus.active) {
      return customer.limiteCreditoRecarga > 0;
    }

    return customer.limiteCreditoRecarga === 0;
  }

  private filtrarPorCampanhaChurn(customer: Customer, filtros: Filters) {
    const campanhaChurn = filtros.campanhaChurn.status;

    if (campanhaChurn === SelectFilterStatus.notApplied) {
      return true;
    }

    return customer.campanhaChurn === Boolean(campanhaChurn);
  }

  private filtrarPorQuantidadeMaquinas(customer: Customer, filtros: Filters) {
    const filtroQuantidadeMaquinas = filtros.quantidadeMaquinas.status;
    const valorQuantidadeMaquinas = parseInt(filtros.quantidadeMaquinas.value, 10);

    if (filtroQuantidadeMaquinas === SelectFilterStatus.notApplied) {
      return true;
    }

    const totalMaquinas = customer.qtdMaquinasPOS + customer.qtdMaquinasTEF;

    if (valorQuantidadeMaquinas < 6) {
      return totalMaquinas === valorQuantidadeMaquinas;
    }

    return totalMaquinas >= valorQuantidadeMaquinas;
  }
}
