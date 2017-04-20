import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';
import { BehaviorSubject } from 'rxjs/Rx';
import * as localForage from 'localforage';

export interface Session {
  data: any;
  createdAt: number;
  lastDataUpdate?: string;
}

export const SESSION_ID = 'session';

@Injectable()
export class SessionService {
  public session: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);

  constructor(private keycloakService: KeycloakService) {
    this.getSession().then(session => this.session.next(session));
  }

  public getSession(): Promise<Session> {
    return localForage.getItem(SESSION_ID);
  }

  public setSession(session: Session): Promise<Session> {
    const promise = localForage.setItem(SESSION_ID, session);
    promise.then(savedSession => this.session.next(savedSession));

    return promise;
  }

  public clear(): Promise<Session> {
    return this.setSession(null);
  }
}
