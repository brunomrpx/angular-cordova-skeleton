import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CustomerFilterService, Filters, SelectFilterStatus } from './customer-filter.service';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.less']
})
export class CustomerFilterComponent {
  private formGroup: FormGroup;
  private selectFilterStatus = SelectFilterStatus;

  constructor(private customerFilterService: CustomerFilterService, private formBuilder: FormBuilder) {
    let localChanges = false;

    this.formGroup = this.formBuilder.group({
      pesquisaRapida: [''],
      utilizaApp: [this.selectFilterStatus.notApplied],
      antecipacaoAutomatica: [this.selectFilterStatus.notApplied],
      limiteRecarga: [this.selectFilterStatus.notApplied],
      campanhaChurn: [this.selectFilterStatus.notApplied],
      quantidadeMaquinas: [this.selectFilterStatus.notApplied],
      grupoEconomico: ['']
    });

    this.formGroup.valueChanges.subscribe(data => {
      if (localChanges) {
        localChanges = false;
        return;
      }

      this.customerFilterService.filters.next(data);
    });

    this.customerFilterService.filters.subscribe(filters => {
      localChanges = true;
      this.formGroup.patchValue(filters);
    });
  }
}
