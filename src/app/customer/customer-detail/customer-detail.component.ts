import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomerService, Customer } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.less']
})
export class CustomerDetailComponent {
  private customer: Customer | {} = {};
  private toggleOpen = {
    dadosCliente: false
  };

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {
    this.route.params.subscribe(params => {
      const query = { idEstabelecimento: parseInt(params.id, 10) };

      this.customerService.getCustomersBy(query, false).then(customer => {
        this.customer = customer;
      });
    });
  }

  private toggle(toggleId) {
    this.toggleOpen[toggleId] = !this.toggleOpen[toggleId];
  }
}
