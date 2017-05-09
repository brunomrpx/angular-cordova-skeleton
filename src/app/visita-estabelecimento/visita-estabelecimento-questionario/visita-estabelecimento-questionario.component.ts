import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { HeaderService } from '../../core/header/header.service';
import { Estabelecimento, EstabelecimentoService } from '../../estabelecimento/estabelecimento.service';
import { VisitaEstabelecimentoService, Questionario } from '../visita-estabelecimento.service';

@Component({
  selector: 'app-visita-estabelecimento-questionario',
  templateUrl: './visita-estabelecimento-questionario.component.html',
  styleUrls: ['./visita-estabelecimento-questionario.component.less']
})
export class VisitaEstabelecimentoQuestionarioComponent {
  private estabelecimento: Estabelecimento;
  private titleSubscription: Subscription;
  private questionario: Questionario;

  constructor(
    private headerService: HeaderService,
    private estabelecimentoService: EstabelecimentoService,
    private router: Router,
    private visitaEstabeleciementoService: VisitaEstabelecimentoService
  ) {
    // this.estabelecimento = this.estabelecimentoService.estabelecimentoSelecionado.value;
    // this.headerService.title.next(this.estabelecimento.nome);

    // this.titleSubscription = this.router.events.filter(e => e instanceof NavigationEnd).subscribe(e => {
    //   this.headerService.title.next(null);
    //   this.titleSubscription.unsubscribe();
    // });

    this.visitaEstabeleciementoService.questionario.subscribe(questionario => {
      this.questionario = questionario;
    });
  }
}
