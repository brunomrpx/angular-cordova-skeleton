import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Estabelecimento } from '../../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-faturamento-mensal',
  templateUrl: './faturamento-mensal.component.html',
  styleUrls: ['./faturamento-mensal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FaturamentoMensalComponent {
  @Input() private estabelecimento: Estabelecimento | {} = {};
}
