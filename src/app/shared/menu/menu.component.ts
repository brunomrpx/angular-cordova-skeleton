import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarService } from '../sidebar/sidebar.service';
import { MenuItem } from './menu.service';
import { MENU_ITEMS } from '../../app.constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent {
  private menuItems: MenuItem[] = MENU_ITEMS;

  constructor(private router: Router, private sidebarSerice: SidebarService) {}

  private goToAction(menuItem: MenuItem) {
    console.log('go to action: ', menuItem);

    this.sidebarSerice.toggleMenuLeft();

    if (typeof menuItem.action === 'string') {
      this.router.navigateByUrl(menuItem.action);
    } else {
      menuItem.action();
    }
  }
}
