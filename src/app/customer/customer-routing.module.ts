import { NgModule } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { MenuComponent } from '../shared/menu/menu.component';

const routes: Routes = [
  {
    path: 'customer',
    children: [
      {
        path: 'list',
        component: SidebarComponent,
        children: [
          { path: '', component: CustomerListComponent, data: { root: true } },
          { path: '', component: MenuComponent, outlet: 'menu-left' },
          { path: '', component: CustomerFilterComponent, outlet: 'menu-right' }
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
