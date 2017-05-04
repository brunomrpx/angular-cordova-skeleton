import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import * as localForage from 'localforage';

export interface Questionario {
  resumoVisita: string;
};

@Injectable()
export class VisitaEstabelecimentoService {
  public questionario: BehaviorSubject<Questionario> = new BehaviorSubject<Questionario>({
    resumoVisita: null
  });

  constructor() {
  }
}
