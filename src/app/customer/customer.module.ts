import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { CustomerListHeaderComponent } from './customer-list/customer-list-header/customer-list-header.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ],
  declarations: [CustomerListComponent, CustomerDetailComponent, CustomerFilterComponent, CustomerListHeaderComponent],
})
export class CustomerModule { }
