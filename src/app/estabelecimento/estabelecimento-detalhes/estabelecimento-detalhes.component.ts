import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EstabelecimentoService, Estabelecimento } from '../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-detalhes',
  templateUrl: './estabelecimento-detalhes.component.html'
})
export class EstabelecimentoDetalhesComponent {
  private estabelecimento: Estabelecimento;

  constructor(
    private activatedRoute: ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService
  ) {
    this.activatedRoute.params.subscribe(params => {
      const busca = { idEstabelecimento: parseInt(params.id, 10) };

      this.estabelecimentoService.getEstabelecimentosPor(busca, false).then(estabelecimento => {
        console.log('estabelecimento: ', estabelecimento);
        this.estabelecimento = estabelecimento;
      });
    });
  }

  private irParaQuestionario() {
    // TODO: ir para questionário
  }
}
