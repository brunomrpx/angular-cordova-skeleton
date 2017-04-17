import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SidebarService, Menu } from '../../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
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
