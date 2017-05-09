import { Component, Input } from '@angular/core';

import { ValorPorPeriodo } from '../../estabelecimento/estabelecimento.service';

@Component({
  selector: 'app-listagem-periodos',
  templateUrl: './listagem-periodos.component.html'
})
export class ListagemPeriodosComponent {
  @Input() valoresPorPeriodo: ValorPorPeriodo[] = [];
}
