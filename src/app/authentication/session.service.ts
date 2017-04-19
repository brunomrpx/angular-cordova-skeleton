import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';
import * as localForage from 'localforage';

export interface Session {
  data: any;
  createdAt: string;
  lastDataUpdate?: string;
}

export const SESSION_ID = 'session';

@Injectable()
export class SessionService {
  constructor(private keycloakService: KeycloakService) {}

  public getSession(): Promise<Session> {
    return localForage.getItem(SESSION_ID);
  }

  public setSession(session: Session): Promise<Session> {
    return localForage.setItem(SESSION_ID, session);
  }

  private clear(): Promise<Session> {
    return this.setSession(null);
  }
}
