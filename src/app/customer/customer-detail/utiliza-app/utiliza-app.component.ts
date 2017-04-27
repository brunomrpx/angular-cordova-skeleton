import { Component, Input } from '@angular/core';

import { Customer } from '../../customer.service';

@Component({
  selector: 'app-customer-utiliza-app',
  templateUrl: './utiliza-app.component.html',
  styleUrls: ['./utiliza-app.component.less']
})
export class UtilizaAppComponent {
  @Input() private customer: Customer | {} = {};
}
