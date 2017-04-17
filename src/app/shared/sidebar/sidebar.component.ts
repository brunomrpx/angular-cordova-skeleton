import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarService, Menu } from './sidebar.service';
import { HeaderComponent } from '../header/header.component';

declare var Slideout: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
  @ViewChild('pageWrapper') pageWrapper: ElementRef;
  @ViewChild('menuLeft') menuLeft: ElementRef;
  @ViewChild('menuRight') menuRight: ElementRef;

  constructor(private sidebarService: SidebarService) {}

  private handleActivateHeader(component) {
    let headerComponent: HeaderComponent;
    let navbarElement: any;

    if (component instanceof HeaderComponent) {
      headerComponent = component;
    } else {
      headerComponent = component.headerComponent;
    }

    navbarElement = headerComponent.navbar.nativeElement;

    this.sidebarService.menuRight.subscribe(menu => {
      this.sidebarService.bindNavbarEvents(navbarElement, menu.slideoutInstance);
    });

    this.sidebarService.menuLeft.subscribe(menu => {
      this.sidebarService.bindNavbarEvents(navbarElement, menu.slideoutInstance);
    });
  }

  private handleActivateMenuLeft() {
    const slideout = new Slideout({
      panel: this.pageWrapper.nativeElement,
      menu: this.menuLeft.nativeElement,
      padding: 256
    });

    this.sidebarService.menuLeft.next({ slideoutInstance: slideout });
  }

  private handleDeactivateMenuLeft() {
    this.sidebarService.menuLeft.value.slideoutInstance.destroy();
  }

  private handleActivateMenuRight() {
    const slideout = new Slideout({
      panel: this.pageWrapper.nativeElement,
      menu: this.menuRight.nativeElement,
      padding: 256,
      side: 'right'
    });

    this.sidebarService.menuRight.next({ slideoutInstance: slideout });
  }

  private handleDeactivateMenuRight() {
    this.sidebarService.menuRight.value.slideoutInstance.destroy();
  }
}
