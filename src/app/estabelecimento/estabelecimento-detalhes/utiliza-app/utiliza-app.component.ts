import { Component, Input } from '@angular/core';

import { Estabelecimento } from '../../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-utiliza-app',
  templateUrl: './utiliza-app.component.html',
  styleUrls: ['./utiliza-app.component.less']
})
export class UtilizaAppComponent {
  @Input() private estabelecimento: Estabelecimento;
}
