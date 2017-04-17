import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

export interface Menu {
  slideoutInstance?: any;
}

@Injectable()
export class SidebarService {
  public menuLeft: BehaviorSubject<Menu> = new BehaviorSubject<Menu>({});
  public menuRight: BehaviorSubject<Menu> = new BehaviorSubject<Menu>({});

  constructor() {
    this.menuLeft.subscribe(menu => this.bindMenuEvents(menu.slideoutInstance));
    this.menuRight.subscribe(menu => this.bindMenuEvents(menu.slideoutInstance));
  }

  public toggleMenuLeft() {
    const slideout = this.menuLeft.value.slideoutInstance;
    this.toggleMenu(slideout);
  }

  public toggleMenuRight() {
    const slideout = this.menuRight.value.slideoutInstance;
    this.toggleMenu(slideout);
  }

  private bindMenuEvents(slideout: any) {
    if (!slideout) {
      return;
    }

    slideout.on('translatestart', () => slideout.menu.style.zIndex = '0');
    slideout.on('close', () => slideout.menu.style.zIndex = '-1');
  }

  private toggleMenu(slideout: any) {
    if (!slideout.isOpen()) {
      slideout.menu.style.zIndex = '0';
    }

    slideout.toggle();
  }
}
