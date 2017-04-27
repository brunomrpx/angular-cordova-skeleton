import { Component, Input } from '@angular/core';

import { Customer } from '../../customer.service';

@Component({
  selector: 'app-customer-antecipacao-automatica',
  templateUrl: './antecipacao-automatica.component.html',
  styleUrls: ['./antecipacao-automatica.component.less']
})
export class AntecipacaoAutomaticaComponent {
  @Input() private customer: Customer | {} = {};
  private contentOpened = false;

  private toggleContent() {
    this.contentOpened = !this.contentOpened;
  }
}
