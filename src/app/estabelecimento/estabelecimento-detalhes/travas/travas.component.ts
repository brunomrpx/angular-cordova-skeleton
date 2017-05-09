import { Component, Input } from '@angular/core';

import { Estabelecimento } from '../../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-travas',
  templateUrl: './travas.component.html',
  styleUrls: ['./travas.component.less']
})
export class TravasComponent {
  @Input() private estabelecimento: Estabelecimento;
}
