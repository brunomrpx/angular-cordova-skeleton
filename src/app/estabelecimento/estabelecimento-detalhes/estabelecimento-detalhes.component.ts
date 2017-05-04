import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EstabelecimentoService, Estabelecimento } from '../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-detalhes',
  templateUrl: './estabelecimento-detalhes.component.html'
})
export class EstabelecimentoDetalhesComponent {
  private estabelecimento: Estabelecimento;

  constructor(
    private activatedRoute: ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService,
    private router: Router
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
    const url = `/visita-estabelecimento/${this.estabelecimento.idEstabelecimento}/resumo`;
    this.router.navigateByUrl(url);
  }
}
