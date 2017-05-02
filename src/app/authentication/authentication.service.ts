import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';

import { SessionService } from './session.service';
import { SincronizacaoService } from '../sincronizacao/sincronizacao.service';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';
import * as localForage from 'localforage';

@Injectable()
export class AuthenticationService {
  constructor(
    private keycloakService: KeycloakService,
    private sessionService: SessionService,
    private sincronizacaoService: SincronizacaoService,
    private estabelecimentoService: EstabelecimentoService
  ) {}

  public logout() {
    const promise = this.sessionService.clear().then(() => {
      this.keycloakService.keycloak.logout();
      return this.sincronizacaoService.setSincronizacaoId(null);
    }).then(() => {
      return this.estabelecimentoService.setEstabelecimentos(null);
    });

    return promise;
  }
}
