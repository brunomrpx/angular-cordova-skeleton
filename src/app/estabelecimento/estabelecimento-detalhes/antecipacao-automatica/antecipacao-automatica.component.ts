import { Component, Input } from '@angular/core';

import { Estabelecimento } from '../../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-antecipacao-automatica',
  templateUrl: './antecipacao-automatica.component.html',
  styleUrls: ['./antecipacao-automatica.component.less']
})
export class AntecipacaoAutomaticaComponent {
  @Input() private estabelecimento: Estabelecimento;
}
