import { Component, ViewChild, ElementRef } from '@angular/core';

import { SidebarService } from './sidebar.service';
import { Subject, Subscription } from 'rxjs';

declare var Slideout: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
  @ViewChild('pageWrapper') pageWrapper: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  private title: string;
  private titleSubscription: Subscription;

  private slideoutInstance;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.titleSubscription = (this.sidebarService.title as Subject<string>).subscribe(title => {
      this.title = title;
    });
  }

  ngOnDestroy() {
    this.titleSubscription.unsubscribe();
  }

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
