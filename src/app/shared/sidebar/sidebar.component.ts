import { Component, ViewChild, ElementRef } from '@angular/core';

import { SidebarService } from './sidebar.service';

declare var Slideout: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
  @ViewChild('pageWrapper') pageWrapper: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  constructor(private sidebarService: SidebarService) {}

  ngAfterViewInit() {
    console.log('starting slideout');

    let slideout = new Slideout({
      panel: this.pageWrapper.nativeElement,
      menu: this.menu.nativeElement,
      padding: 256
    });

    this.sidebarService.slideout = slideout;
  }
}
