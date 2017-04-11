import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'customer',
    children: [
      {
        path: '',
        component: SidebarComponent,
        children: [
          { path: '', component: CustomerListComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
