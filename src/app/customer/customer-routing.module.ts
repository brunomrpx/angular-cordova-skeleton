import { NgModule } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'customer',
    children: [
      {
        path: 'list',
        component: SidebarComponent,
        children: [
          { path: '', component: CustomerListComponent, data: { root: true } }
        ]
      },
      {
        path: 'detail',
        component: SidebarComponent,
        children: [
          { path: '', component: CustomerDetailComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
