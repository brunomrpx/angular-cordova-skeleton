import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { SidebarService } from '../../shared/sidebar/sidebar.service';
import { HttpService } from '../../shared/http/http.service';
import { CustomerService, Customer } from '../customer.service';
import { CustomerFilterService, Filters, SelectFilterStatus, FiltrosSelecionados } from '../customer-filter/customer-filter.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.less']
})
export class CustomerListComponent implements OnInit {
  private filterOpened: boolean = false;
  private filterIcon = {
    opened: 'fa-chevron-left',
    closed: 'fa-search'
  };
  private customerList: Customer[] = [];
  private filteredCustomers: Customer[] = [];
  private filtrosSelecionados: FiltrosSelecionados[] = [];
  private selectFilterStatus = SelectFilterStatus;

  constructor(
    private sidebarService: SidebarService,
    private customerService: CustomerService,
    private customerFilterService: CustomerFilterService
  ) {}

  ngOnInit() {
    this.sidebarService.menuRight.subscribe(menu => {
      const slideout = menu.slideoutInstance;

      if (!slideout) {
        return;
      }

      slideout.on('open', () => this.filterOpened = true);
      slideout.on('close', () => this.filterOpened = false);
    });

    this.customerService.customers.subscribe(customers => {
      this.customerList = customers;
      this.filteredCustomers = customers;
    });

    this.customerFilterService.filters.subscribe(filters => {
      this.filtrosSelecionados = this.customerFilterService.getMensagensFiltrosSelecionados(filters);
      this.filteredCustomers = this.customerFilterService.filterCustomers(this.customerList, filters);
    });
  }

  private removerFiltro(filtroSelecionado) {
    const filters = this.customerFilterService.filters.value;

    if (filtroSelecionado.filtro === 'pesquisaRapida' || filtroSelecionado.filtro === 'grupoEconomico') {
      filters[filtroSelecionado.filtro] = '';
    } else {
      filters[filtroSelecionado.filtro] = SelectFilterStatus.notApplied;
    }

    this.customerFilterService.filters.next(filters);
  }

  private toggleFilter() {
    this.sidebarService.toggleMenuRight();
  }
}
