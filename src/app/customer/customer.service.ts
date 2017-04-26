import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import * as localForage from 'localforage';

export interface Customer {
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
}

export const CUSTOMERS_ID = 'customers';

@Injectable()
export class CustomerService {
  public customers: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor() {
    this.getCustomers().then(customers => this.customers.next(customers));
  }

  public getCustomers(): Promise<Customer[]> {
    return localForage.getItem(CUSTOMERS_ID);
  }

  public getCustomersBy(query: {}, returnList = true) {
    return this.getCustomers().then(customers => {
      const filterMethod: string = returnList ? 'filter' : 'find';
      const filteredCustomers = Array.prototype[filterMethod].call(customers, (customer) => {
        return this.filterCustomer(query, customer);
      });

      return filteredCustomers;
    });
  }

  private filterCustomer(query: {}, customer: Customer) {
    for (const prop in query) {
      if (customer[prop] !== query[prop]) {
        return false;
      }
    }

    return true;
  }

  public saveCustomers(customers: Customer[]): Promise<Customer[]> {
    const promise = localForage.setItem(CUSTOMERS_ID, customers);
    promise.then(savedCustomers => this.customers.next(savedCustomers));

    return promise;
  }
}
