import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EstabelecimentoService, Estabelecimento, Responsavel } from '../../estabelecimento.service';
import { TIPO_RESPONSAVEL, TIPO_RESPONSAVEL_FORMATADO, TIPO_STATUS_FORMATADO, TIPO_STATUS } from '../../estabelecimento.constant';

@Component({
  selector: 'app-estabelecimento-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.less']
})
export class DadosCadastraisComponent implements OnChanges {
  @Input() private estabelecimento: Estabelecimento;

  private conteudoAberto = false;
  private TIPO_RESPONSAVEL_FORMATADO = TIPO_RESPONSAVEL_FORMATADO;
  private TIPO_STATUS_FORMATADO = TIPO_STATUS_FORMATADO;
  private TIPO_STATUS = TIPO_STATUS;

  private representanteLegal: Responsavel;

  private toggleConteudo() {
    this.conteudoAberto = !this.conteudoAberto;
  }

  ngOnChanges(changes) {
    const estabelecimento: Estabelecimento = changes.estabelecimento.currentValue;

    if (!estabelecimento || !estabelecimento.responsaveis) {
      return;
    }

    for (const responsavel of estabelecimento.responsaveis) {
      if (responsavel.tipo === TIPO_RESPONSAVEL.REPRESENTANTE_LEGAL) {
        this.representanteLegal = responsavel;
        break;
      }
    }
  }
}
