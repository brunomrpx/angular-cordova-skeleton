import { Component } from '@angular/core';

import { SidebarService } from '../../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  constructor(private sidebarService: SidebarService) {}

  private toggleFilter() {
    this.sidebarService.menuRight.slideoutInstance.toggle();
  }
}
