import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EstabelecimentoService, Estabelecimento } from '../../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.less']
})
export class DadosCadastraisComponent {
  @Input() private estabelecimento: Estabelecimento | {} = {};
  private contentOpened = false;

  private toggleContent(toggleId) {
    this.contentOpened = !this.contentOpened;
  }
}
