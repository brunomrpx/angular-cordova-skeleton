import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Estabelecimento } from '../../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-recarga-habilitada',
  templateUrl: './recarga-habilitada.component.html',
  styleUrls: ['./recarga-habilitada.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RecargaHabilitadaComponent {
  @Input() private estabelecimento: Estabelecimento;
}
