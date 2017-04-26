import { Component, Input } from '@angular/core';

import { Customer } from '../../customer.service';

@Component({
  selector: 'app-customer-maquinas-instaladas',
  templateUrl: './maquinas-instaladas.component.html',
  styleUrls: ['./maquinas-instaladas.component.less']
})
export class MaquinasInstaladasComponent {
  @Input() private customer: Customer | {} = {};
}
