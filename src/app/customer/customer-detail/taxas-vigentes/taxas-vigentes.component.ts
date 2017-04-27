import { Component, Input } from '@angular/core';

import { Customer } from '../../customer.service';

@Component({
  selector: 'app-customer-taxas-vigentes',
  templateUrl: './taxas-vigentes.component.html',
  styleUrls: ['./taxas-vigentes.component.less']
})
export class TaxasVigentesComponent {
  @Input() private customer: Customer | {} = {};
}
