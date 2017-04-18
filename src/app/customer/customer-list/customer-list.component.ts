import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { SidebarService } from '../../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.less']
})
export class CustomerListComponent {
  private filterOpened: boolean = false;
  private filterIcon = {
    opened: 'fa-chevron-left',
    closed: 'fa-search'
  };
  private customerList = [
    { name: 'Nome do Estabelecimento', lastUpdate: '25/01/2015', address: 'Porto Alegre / Tristeza' },
    { name: 'Nome do Estabelecimento', lastUpdate: '25/01/2015', address: 'Porto Alegre / Tristeza' },
    { name: 'Nome do Estabelecimento', lastUpdate: '25/01/2015', address: 'Porto Alegre / Tristeza' },
    { name: 'Nome do Estabelecimento', lastUpdate: '25/01/2015', address: 'Porto Alegre / Tristeza' },
    { name: 'Nome do Estabelecimento', lastUpdate: '25/01/2015', address: 'Porto Alegre / Tristeza' },
    { name: 'Nome do Estabelecimento', lastUpdate: '25/01/2015', address: 'Porto Alegre / Tristeza' },
    { name: 'Nome do Estabelecimento', lastUpdate: '25/01/2015', address: 'Porto Alegre / Tristeza' },
    { name: 'Nome do Estabelecimento', lastUpdate: '25/01/2015', address: 'Porto Alegre / Tristeza' },
    { name: 'Nome do Estabelecimento', lastUpdate: '25/01/2015', address: 'Porto Alegre / Tristeza' },
  ]

  constructor(private sidebarService: SidebarService) {}

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
