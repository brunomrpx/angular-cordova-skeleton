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
  private localChanges = false;

  constructor(private customerFilterService: CustomerFilterService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      pesquisaRapida: [''],
      grupoEconomico: [''],
      utilizaApp: [this.selectFilterStatus.notApplied],
      antecipacaoAutomatica: [this.selectFilterStatus.notApplied],
      limiteRecarga: [this.selectFilterStatus.notApplied],
      campanhaChurn: [this.selectFilterStatus.notApplied],
      quantidadeMaquinas: [this.selectFilterStatus.notApplied]
    });

    this.formGroup.valueChanges.subscribe(this.handleFormChange.bind(this));
    this.customerFilterService.filters.subscribe(this.handleFiltersChange.bind(this));
  }

  private handleFiltersChange(filters) {
    if (this.localChanges) {
      this.localChanges = false;
      return;
    }

    this.localChanges = true;

    const changes = {};

    for (const prop in filters) {
      if (filters[prop].value !== null) {
        changes[prop] = filters[prop].value;
      } else {
        changes[prop] = filters[prop].status;
      }
    }

    this.formGroup.patchValue(changes);
  }

  private handleFormChange(data) {
    if (this.localChanges) {
      this.localChanges = false;
      return;
    }

    this.localChanges = true;

    const filters = this.customerFilterService.filters.value;
    let filter, value;

    for (const prop in data) {
      filter = filters[prop];
      value = data[prop];

      if (filter.search) {
       this.updateSearchFilter(filter, value);
      } else if (filter.customValue) {
        this.updateCustomValueFilter(filter, value);
      } else {
        this.updateDefaultFilter(filter, value);
      }

      if (filter.showValueAsLabel) {
        filter.label = value;
      }

      filter.value = value;
    }

    this.customerFilterService.filters.next(filters);
  }

  private updateSearchFilter(filter, value) {
    if (value === '') {
      filter.status = SelectFilterStatus.notApplied;
    } else {
      filter.status = SelectFilterStatus.active;
    }
  }

  private updateCustomValueFilter(filter, value) {
    if (parseInt(value, 10) === SelectFilterStatus.notApplied) {
      filter.status = SelectFilterStatus.notApplied;
    } else {
      filter.status = SelectFilterStatus.active;
    }
  }

  private updateDefaultFilter(filter, value) {
    filter.status = parseInt(value, 10);
  }

  private removeAllFilters() {
    const filters = this.customerFilterService.filters.value;
    const filtersIds = Object.keys(filters);

    this.customerFilterService.removeFilters(filtersIds);
  }
}
