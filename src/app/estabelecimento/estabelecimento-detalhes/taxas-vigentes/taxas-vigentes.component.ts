import { Component, Input } from '@angular/core';

import { Estabelecimento } from '../../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-taxas-vigentes',
  templateUrl: './taxas-vigentes.component.html',
  styleUrls: ['./taxas-vigentes.component.less']
})
export class TaxasVigentesComponent {
  @Input() private estabelecimento: Estabelecimento;
}
