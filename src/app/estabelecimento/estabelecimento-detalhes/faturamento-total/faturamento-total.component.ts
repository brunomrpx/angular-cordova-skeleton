import { Component, Input } from '@angular/core';

import { Estabelecimento } from '../../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-faturamento-total',
  templateUrl: './faturamento-total.component.html',
  styleUrls: ['./faturamento-total.component.less']
})
export class FaturamentoTotalComponent {
  @Input() private estabelecimento: Estabelecimento;
}
