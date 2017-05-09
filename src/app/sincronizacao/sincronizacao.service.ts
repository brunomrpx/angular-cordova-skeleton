import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { URLSearchParams, RequestOptionsArgs } from '@angular/http';
import * as localForage from 'localforage';

import { HttpServiceConfig, HttpService } from '../core/http/http.service';
import { EstabelecimentoService, Estabelecimento } from '../estabelecimento/estabelecimento.service';
import { API_BASE_URL } from '../app.constant';
import { SINCRONIZACAO_STORAGE_ID } from './sincronizacao.constant';

export interface SincronizacaoResponse {
  idSincronizacao: number;
  listaEstabelecimentosComerciais: Estabelecimento[];
}

@Injectable()
export class SincronizacaoService {
  private url: string = API_BASE_URL + '/estabelecimento';

  constructor(private httpService: HttpService, private estabelecimentoService: EstabelecimentoService) { }

  public download(): Observable<any> {
    const getSincronizacaoIdObservable = Observable.fromPromise(this.getSincronizacaoId());

    const sincronizacaoObservable = getSincronizacaoIdObservable.flatMap(sincronizacaoId => {
      console.log('last synchronization id: ', sincronizacaoId);

      const requestOptions: RequestOptionsArgs = {};

      if (sincronizacaoId) {
        const searchParams = new URLSearchParams();
        searchParams.append('idUltimaSincronizacao', String(sincronizacaoId));
        requestOptions.search = searchParams;
      }

      const observable = this.httpService
        .get(this.url, requestOptions)
        .map((response) => response.json() as SincronizacaoResponse)
        .flatMap(responseJson => this.verificarDadosSincronizados(sincronizacaoId, responseJson));

      return observable;
    });

    return sincronizacaoObservable;
  }

  private verificarDadosSincronizados(sincronizacaoId, responseJson: SincronizacaoResponse) {
    if (sincronizacaoId && (responseJson.idSincronizacao === sincronizacaoId)) {
      console.log('data already updated');
      return Observable.of(responseJson);
    }

    const setSincronizacaoIdPromise = this.setSincronizacaoId(responseJson.idSincronizacao);
    const setSincronizacaoIdObservable = Observable.fromPromise(setSincronizacaoIdPromise);

    const setEstabelecimentosPromise = this.estabelecimentoService.setEstabelecimentos(responseJson.listaEstabelecimentosComerciais);
    const setEstabelecimentosObservable = Observable.fromPromise(setEstabelecimentosPromise);

    const observables = Observable.forkJoin([
      setSincronizacaoIdObservable,
      setEstabelecimentosObservable
    ]);

    return observables;
  }

  private getSincronizacaoId() {
    return localForage.getItem(SINCRONIZACAO_STORAGE_ID);
  }

  public setSincronizacaoId(sincronizacaoId: number) {
    return localForage.setItem(SINCRONIZACAO_STORAGE_ID, sincronizacaoId);
  }
}
