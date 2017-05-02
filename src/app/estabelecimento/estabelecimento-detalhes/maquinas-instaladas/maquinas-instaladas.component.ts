import { Component, Input } from '@angular/core';

import { Estabelecimento } from '../../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-maquinas-instaladas',
  templateUrl: './maquinas-instaladas.component.html',
  styleUrls: ['./maquinas-instaladas.component.less']
})
export class MaquinasInstaladasComponent {
  @Input() private estabelecimento: Estabelecimento | {} = {};
}
