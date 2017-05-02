import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Customer } from '../../customer.service';

@Component({
  selector: 'app-customer-recarga-habilitada',
  templateUrl: './recarga-habilitada.component.html',
  styleUrls: ['./recarga-habilitada.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RecargaHabilitadaComponent {
  @Input() private customer: Customer | {} = {};
}
