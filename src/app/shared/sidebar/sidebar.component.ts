import { Component, ViewChild, ElementRef } from '@angular/core';

import { SidebarService } from './sidebar.service';
import { HeaderComponent } from '../header/header.component';
import { SWIPPEABLE_WIDTH } from './sidebar.constant';

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

  private handlePageWraperTouchStart(event) {
    const menuLeftSlideout = this.sidebarService.menuLeft.value.slideoutInstance;
    const menuRightSlideout = this.sidebarService.menuRight.value.slideoutInstance;
    const clientX = event.touches[0].clientX;

    if (menuLeftSlideout) {
      if (!menuLeftSlideout.isOpen()) {
        menuLeftSlideout.disableTouch();

        if (clientX <= SWIPPEABLE_WIDTH) {
          menuLeftSlideout.enableTouch();
        }
      }
    }

    if (menuRightSlideout) {
      if (!menuRightSlideout.isOpen()) {
        menuRightSlideout.disableTouch();

        if (clientX >= (window.screen.width - SWIPPEABLE_WIDTH)) {
          menuRightSlideout.enableTouch();
        }
      }
    }
  }

  private handlePageWrapperTouch(event) {
    const menuLeftSlideout = this.sidebarService.menuLeft.value.slideoutInstance;
    const menuRightSlideout = this.sidebarService.menuRight.value.slideoutInstance;

    if (menuLeftSlideout.isOpen()) {
      menuLeftSlideout.toggle();
    }

    if (menuRightSlideout.isOpen()) {
      menuRightSlideout.toggle();
    }
  }

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
