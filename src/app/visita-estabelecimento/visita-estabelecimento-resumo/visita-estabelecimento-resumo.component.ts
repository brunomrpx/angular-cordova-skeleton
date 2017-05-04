import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Estabelecimento, EstabelecimentoService } from '../../estabelecimento/estabelecimento.service';
import { RESUMO_VISITA_OPCOES } from './visita-estabelecimento-resumo.constant';

interface Opcao {
  label: string;
}

@Component({
  selector: 'app-visita-estabelecimento-resumo',
  templateUrl: './visita-estabelecimento-resumo.component.html',
  styleUrls: ['./visita-estabelecimento-resumo.component.less']
})
export class VisitaEstabelecimentoResumoComponent {
  private estabelecimento: Estabelecimento;

  private opcoes: Opcao[] = [];
  private opcaoSelecionada: Opcao = null;

  constructor(private estabelecimentoService: EstabelecimentoService, private activatedRoute: ActivatedRoute) {
    const opcoes = [];

    for (const prop in RESUMO_VISITA_OPCOES) {
      opcoes.push({
        _key: prop,
        ...RESUMO_VISITA_OPCOES[prop]
      });
    }

    this.opcoes = opcoes;

    this.activatedRoute.params.subscribe(params => {
      const busca = { idEstabelecimento: parseInt(params.id, 10) };

      this.estabelecimentoService.getEstabelecimentosPor(busca, false).then(estabelecimento => {
        this.estabelecimento = estabelecimento;
      });
    });
  }

  private toggleOpcao(opcao: Opcao) {
    if (this.opcaoSelecionada === opcao) {
      this.opcaoSelecionada = null;
      return;
    }

    this.opcaoSelecionada = opcao;
  }

  private confirmarResposta() {
    console.log('confirmar resposta: ', this.opcaoSelecionada);
  }
}
