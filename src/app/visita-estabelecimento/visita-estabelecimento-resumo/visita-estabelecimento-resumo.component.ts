import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Estabelecimento, EstabelecimentoService } from '../../estabelecimento/estabelecimento.service';
import { RESUMO_VISITA_OPCOES } from './visita-estabelecimento-resumo.constant';
import { VisitaEstabelecimentoService } from '../visita-estabelecimento.service';
import { Subscription } from 'rxjs/Rx';

interface Opcao {
  label: string;
}

@Component({
  selector: 'app-visita-estabelecimento-resumo',
  templateUrl: './visita-estabelecimento-resumo.component.html',
  styleUrls: ['./visita-estabelecimento-resumo.component.less']
})
export class VisitaEstabelecimentoResumoComponent implements OnDestroy {
  private estabelecimento: Estabelecimento;
  private opcoes: Opcao[] = [];
  private opcaoSelecionada: Opcao = null;
  private estabelecimentoServiceSubscription: Subscription;

  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private activatedRoute: ActivatedRoute,
    private visitaEstabelecimentoService: VisitaEstabelecimentoService,
    private router: Router
  ) {
    const opcoes = [];
    const questionario = this.visitaEstabelecimentoService.questionario.value;

    for (const prop in RESUMO_VISITA_OPCOES) {
      opcoes.push({
        _key: prop,
        ...RESUMO_VISITA_OPCOES[prop]
      });
    }

    this.opcoes = opcoes;

    if (questionario && questionario.resumoVisita) {
      this.opcaoSelecionada = this.opcoes.find(o => o.label === questionario.resumoVisita);
    }

    this.estabelecimentoServiceSubscription = this.estabelecimentoService.estabelecimentoSelecionado.subscribe(estabelecimento => {
      this.estabelecimento = estabelecimento;
    });
  }

  public ngOnDestroy() {
    this.estabelecimentoServiceSubscription.unsubscribe();
  }

  private toggleOpcao(opcao: Opcao) {
    if (this.opcaoSelecionada === opcao) {
      this.opcaoSelecionada = null;
      return;
    }

    this.opcaoSelecionada = opcao;
  }

  private confirmarResposta() {
    const questionario = this.visitaEstabelecimentoService.questionario.value;
    questionario.resumoVisita = this.opcaoSelecionada.label;

    this.visitaEstabelecimentoService.questionario.next(questionario);

    this.router.navigate(['../questionario'], { relativeTo: this.activatedRoute.parent });
  }
}
