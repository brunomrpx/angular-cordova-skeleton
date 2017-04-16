import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';

import { HeaderService } from '../header/header.service';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() title: string;

  private showBackButton: boolean = false;
  private backButtonSubscription: Subscription;

  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private platformLocation: PlatformLocation,
    private sidebarService: SidebarService
  ) {
    this.backButtonSubscription = this.route.data.subscribe(data => {
      this.showBackButton = !(Boolean(data.root));

      if (this.headerService.useSidebar && this.showBackButton) {
        this.sidebarService.slideout.destroy();
      }
    });
  }

  private goBack() {
    this.platformLocation.back();
  }

  private toggleMenu() {
    this.sidebarService.slideout.toggle();
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
