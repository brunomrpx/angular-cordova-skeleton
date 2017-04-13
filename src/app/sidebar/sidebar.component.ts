import { Component, ViewChild, ElementRef } from '@angular/core';

declare var Slideout: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
  @ViewChild('pageWrapper') pageWrapper: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  private slideoutInstance;

  ngAfterViewInit() {
    this.slideoutInstance = new Slideout({
      panel: this.pageWrapper.nativeElement,
      menu: this.menu.nativeElement,
      padding: 256
    });
  }

  private toggleMenu() {
    this.slideoutInstance.toggle();
  }
}
