import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { EstabelecimentoService, Estabelecimento } from '../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-detalhes',
  templateUrl: './estabelecimento-detalhes.component.html'
})
export class EstabelecimentoDetalhesComponent implements OnDestroy {
  private estabelecimento: Estabelecimento;

  private activatedRouteSubscription: Subscription;
  private routerSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService,
    private router: Router
  ) {
    const estabelecimentoSelecionado = this.estabelecimentoService.estabelecimentoSelecionado.value;

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params => {
      const idEstabelecimento = parseInt(params.id, 10);

      if (estabelecimentoSelecionado === null || estabelecimentoSelecionado.idEstabelecimento !== idEstabelecimento) {
        const busca = { idEstabelecimento };

        this.estabelecimentoService.getEstabelecimentosPor(busca, false).then(estabelecimento => {
          console.log('carregando estabelecimento: ', estabelecimento);
          this.estabelecimento = estabelecimento;
          this.estabelecimentoService.estabelecimentoSelecionado.next(estabelecimento);
        });
      } else {
        this.estabelecimento = estabelecimentoSelecionado;
        console.log('estabelecimento já carregado: ', this.estabelecimento);
      }
    });
  }

  public ngOnDestroy() {
    this.activatedRouteSubscription.unsubscribe();
  }

  private irParaQuestionario() {
    const url = `/visita-estabelecimento/${this.estabelecimento.idEstabelecimento}/resumo`;
    this.router.navigateByUrl(url);
  }
}
