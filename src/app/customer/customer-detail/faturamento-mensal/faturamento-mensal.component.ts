import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Customer } from '../../customer.service';

@Component({
  selector: 'app-customer-faturamento-mensal',
  templateUrl: './faturamento-mensal.component.html',
  styleUrls: ['./faturamento-mensal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FaturamentoMensalComponent {
  @Input() private customer: Customer | {} = {};
}
