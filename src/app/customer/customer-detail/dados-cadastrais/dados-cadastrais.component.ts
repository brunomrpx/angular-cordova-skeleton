import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomerService, Customer } from '../../customer.service';

@Component({
  selector: 'app-customer-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.less']
})
export class DadosCadastraisComponent {
  @Input() private customer: Customer | {} = {};
  private toggleOpen = false;

  private toggle(toggleId) {
    this.toggleOpen = !this.toggleOpen;
  }
}
