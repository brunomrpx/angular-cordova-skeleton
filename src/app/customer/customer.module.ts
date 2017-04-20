import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { CustomerListHeaderComponent } from './customer-list/customer-list-header/customer-list-header.component';
import { CustomerService } from './customer.service';
import { CustomerFilterService } from './customer-filter/customer-filter.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    SharedModule
  ],
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerFilterComponent,
    CustomerListHeaderComponent
  ],
  providers: [
    CustomerService,
    CustomerFilterService
  ]
})
export class CustomerModule { }
