import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  private _slideout: any;

  get slideout(): any {
    return this._slideout;
  }

  set slideout(slideout: any) {
    this._slideout = slideout;
  }
}
