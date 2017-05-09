import { Component, ViewChild, ElementRef } from '@angular/core';

import { SidebarService } from '../../../core/sidebar/sidebar.service';
import { HeaderComponent } from '../../../core/header/header.component';

@Component({
  selector: 'app-estabelecimento-lista-header',
  templateUrl: './estabelecimento-lista-header.component.html'
})
export class EstabelecimentoListaHeaderComponent {
  @ViewChild('header') headerComponent: ElementRef;

  private filtrosAbertos: boolean = false;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.menuRight.subscribe(menu => {
      const slideout = menu.slideoutInstance;

      if (!slideout) {
        return;
      }

      slideout.on('open', () => this.filtrosAbertos = true);
      slideout.on('close', () => this.filtrosAbertos = false);
    });
  }

  private toggleFiltros() {
    this.sidebarService.toggleMenuRight();
  }
}
