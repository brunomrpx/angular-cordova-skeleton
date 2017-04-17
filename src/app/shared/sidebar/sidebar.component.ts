import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarService } from './sidebar.service';

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

  private handleActivateMenuLeft() {
    let slideout = new Slideout({
      panel: this.pageWrapper.nativeElement,
      menu: this.menuLeft.nativeElement,
      padding: 256
    });

    this.sidebarService.menuLeft = { slideoutInstance: slideout };
  }

  private handleDeactivateMenuLeft() {
    this.sidebarService.menuLeft.slideoutInstance.destroy();
  }

  private handleActivateMenuRight() {
    let slideout = new Slideout({
      panel: this.pageWrapper.nativeElement,
      menu: this.menuRight.nativeElement,
      padding: 256,
      side: 'right'
    });

    this.sidebarService.menuRight = { slideoutInstance: slideout };
  }

  private handleDeactivateMenuRight() {
    this.sidebarService.menuRight.slideoutInstance.destroy();
  }
}
