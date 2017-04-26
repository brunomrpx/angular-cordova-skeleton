import { Component, Input } from '@angular/core';

import { Customer } from '../../customer.service';

@Component({
  selector: 'app-customer-faturamento-total',
  templateUrl: './faturamento-total.component.html',
  styleUrls: ['./faturamento-total.component.less']
})
export class FaturamentoTotalComponent {
  @Input() private customer: Customer | {} = {};
}
