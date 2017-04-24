import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarService } from '../sidebar/sidebar.service';
import { MenuItem } from './menu.service';
import { MENU_ITEMS } from '../../app.constant';
import { AuthenticationService } from '../../authentication/authentication.service';
import { SessionService } from '../../authentication/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent {
  private menuItems: MenuItem[] = MENU_ITEMS;
  private userData: any = {};

  constructor(
    private router: Router,
    private sidebarSerice: SidebarService,
    private authenticationService: AuthenticationService,
    private sessionService: SessionService
  ) {}

  private ngOnInit() {
    this.sessionService.session.subscribe(session => {
      if (!session) {
        return;
      }

      this.userData = session.data;
    });
  }

  private goToAction(menuItem: MenuItem) {
    console.log('go to action: ', menuItem);

    this.sidebarSerice.toggleMenuLeft();

    if (typeof menuItem.action === 'string') {
      this.router.navigateByUrl(menuItem.action);
    } else {
      menuItem.action();
    }
  }

  private logout() {
    this.sidebarSerice.toggleMenuLeft();
    this.authenticationService.logout();
  }
}
