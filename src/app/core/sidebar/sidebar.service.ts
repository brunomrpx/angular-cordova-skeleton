import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

export interface SidebarMenu {
  slideoutInstance?: any;
}

@Injectable()
export class SidebarService {
  public menuLeft: BehaviorSubject<SidebarMenu> = new BehaviorSubject<SidebarMenu>({});
  public menuRight: BehaviorSubject<SidebarMenu> = new BehaviorSubject<SidebarMenu>({});

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

  public bindNavbarEvents(navbarElement: any, slideoutInstance: any) {
    if (!slideoutInstance) {
      return;
    }

    // workaround for fixed header: https://github.com/Mango/slideout#how-to-use-slideout-with-a-fixed-header
    slideoutInstance.on('translate', translated => {
      navbarElement.style.transform = `translateX(${translated}px)`;
    });

    slideoutInstance.on('beforeopen', () => {
      navbarElement.style.transition = 'transform 300ms ease';
      navbarElement.style.transform = `translateX(${slideoutInstance._translateTo}px)`;
    });

    slideoutInstance.on('beforeclose', () => {
      navbarElement.style.transition = 'transform 300ms ease';
      navbarElement.style.transform = 'translateX(0px)';
    });

    slideoutInstance.on('open', () => navbarElement.style.transition = '');
    slideoutInstance.on('close', () => navbarElement.style.transition = '');
  }

  private bindMenuEvents(slideout: any) {
    if (!slideout) {
      return;
    }

    // manipulating z-index for two Slideout instances (left and right)
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
