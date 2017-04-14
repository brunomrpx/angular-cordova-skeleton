import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SidebarService {
  private _title: Subject<string>;

  constructor() {
    this._title = new Subject<string>();
  }

  get title(): Subject<string> | string {
    return this._title;
  }

  set title(title: Subject<string> | string) {
   this._title.next(title as string);
  }
}
