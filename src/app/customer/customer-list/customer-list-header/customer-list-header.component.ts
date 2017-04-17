import { Component, ViewChild, ElementRef } from '@angular/core';

import { SidebarService } from '../../../shared/sidebar/sidebar.service';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-customer-list-header',
  templateUrl: './customer-list-header.component.html',
  styleUrls: ['./customer-list-header.component.less']
})
export class CustomerListHeaderComponent {
  @ViewChild('header') headerComponent: ElementRef;

  private filterOpened: boolean = false;
  private filterIcon = {
    opened: 'fa-chevron-left',
    closed: 'fa-search'
  };

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.menuRight.subscribe(menu => {
      const slideout = menu.slideoutInstance;

      if (!slideout) {
        return;
      }

      slideout.on('open', () => this.filterOpened = true);
      slideout.on('close', () => this.filterOpened = false);
    });
  }

  private toggleFilter() {
    this.sidebarService.toggleMenuRight();
  }

}
