import { Injectable } from '@angular/core';

interface Menu {
  slideoutInstance: any
}

@Injectable()
export class SidebarService {
  private _menuLeft: Menu;
  private _menuRight: Menu;

  get menuLeft() {
    return this._menuLeft;
  }

  set menuLeft(menuLeft: Menu) {
    this._menuLeft = menuLeft;
  }

  get menuRight() {
    return this._menuRight;
  }

  set menuRight(menuRight: Menu) {
    this._menuRight = menuRight;
  }
}
