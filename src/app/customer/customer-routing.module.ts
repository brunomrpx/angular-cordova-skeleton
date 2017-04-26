import { NgModule } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { MenuComponent } from '../shared/menu/menu.component';
import { HeaderComponent } from '../shared/header/header.component';
import { CustomerListHeaderComponent } from './customer-list/customer-list-header/customer-list-header.component';

const routes: Routes = [
  {
    path: 'customer',
    children: [
      {
        path: 'list',
        component: SidebarComponent,
        children: [
          { path: '', component: CustomerListComponent },
          { path: '', component: MenuComponent, outlet: 'menu-left' },
          { path: '', component: CustomerFilterComponent, outlet: 'menu-right' },
          { path: '', component: CustomerListHeaderComponent, outlet: 'header', data: { root: true } }
        ]
      },
      {
        path: ':id/details',
        component: SidebarComponent,
        children: [
          { path: '', component: CustomerDetailComponent },
          { path: '', component: HeaderComponent, outlet: 'header', data: { title: 'Detalhes EC' } }
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
