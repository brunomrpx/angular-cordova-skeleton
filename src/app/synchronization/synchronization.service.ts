import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { URLSearchParams, RequestOptionsArgs } from '@angular/http';
import * as localForage from 'localforage';

import { HttpServiceConfig, HttpService } from '../shared/http/http.service';
import { CustomerService, Customer } from '../customer/customer.service';
import { API_BASE_URL } from '../app.constant';

export interface SynchronizationResponse {
  idSincronizacao: number;
  listaEstabelecimentosComerciais: Customer[];
}

export const SYNCHRONIZATION_ID = 'idSincronizacao';

@Injectable()
export class SynchronizationService {
  private url: string = API_BASE_URL + '/sincronizacao';

  constructor(private httpService: HttpService, private customerService: CustomerService) { }

  public download(): Observable<any> {
    const synchronizationObservable = this.getSynchronizationId().flatMap(synchronizationId => {
      console.log('last synchronization id: ', synchronizationId);

      const requestOptions: RequestOptionsArgs = {};

      if (synchronizationId) {
        const searchParams = new URLSearchParams();
        searchParams.append('idUltimaSincronizacao', String(synchronizationId));
        requestOptions.search = searchParams;
      }

      const observable = this.httpService
        .get(this.url)
        .map(this.handleDownloadResponse)
        .flatMap(responseJson => this.checkSynchronizedData(synchronizationId, responseJson));

      return observable;
    });

    return synchronizationObservable;
  }

  private checkSynchronizedData(synchronizationId, responseJson: SynchronizationResponse) {
    if (synchronizationId && (responseJson.idSincronizacao === synchronizationId)) {
      console.log('data already updated');
      return Observable.of(responseJson);
    }

    const saveSynchronizationIdObservable = this.setSynchronizationId(responseJson.idSincronizacao);
    const saveCustomersObservable = this.saveCustomers(responseJson);

    const observables = Observable.forkJoin([
      saveSynchronizationIdObservable,
      saveCustomersObservable
    ]);

    return observables;
  }

  private handleDownloadResponse(response): SynchronizationResponse {
    return response.json() as SynchronizationResponse;
  }

  private saveCustomers(responseJson) {
    const promise = this.customerService.saveCustomers(responseJson.listaEstabelecimentosComerciais);
    return Observable.fromPromise(promise);
  }

  private getSynchronizationId() {
    const promise = localForage.getItem(SYNCHRONIZATION_ID);
    return Observable.fromPromise(promise);
  }

  private setSynchronizationId(synchronizationId: number) {
    const promise = localForage.setItem(SYNCHRONIZATION_ID, synchronizationId);
    return Observable.fromPromise(promise);
  }
}
