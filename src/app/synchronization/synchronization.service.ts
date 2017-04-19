import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpServiceConfig, HttpService } from '../shared/http/http.service';
import { CustomerService, Customer } from '../customer/customer.service';
import { API_BASE_URL } from '../app.constant';

export interface SynchronizationResponse {
  idSincronizacao: number;
  listaEstabelecimentosComerciais: Customer[];
}

@Injectable()
export class SynchronizationService {
  private url: string = API_BASE_URL + '/sincronizacao';

  constructor(private httpService: HttpService, private customerService: CustomerService) {}

  public download(): Observable<any> {
    const observable = this.httpService
      .get(this.url)
      .map(this.handleDownloadResponse)
      .flatMap(responseJson => this.saveCustomers(responseJson));

    return observable;
  }

  private handleDownloadResponse(response): SynchronizationResponse {
    return response.json() as SynchronizationResponse;
  }

  private saveCustomers(responseJson) {
    const promise = this.customerService.saveCustomers(responseJson.listaEstabelecimentosComerciais);
    return Observable.fromPromise(promise);
  }
}
