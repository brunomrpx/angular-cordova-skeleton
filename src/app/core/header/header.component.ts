import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs/Rx';
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
  @ViewChild('navbar') navbar: ElementRef;
  @Input() title: string;

  private showBackButton: boolean = false;
  private dataSubscription: Subscription;
  private titleSubscription: Subscription;

  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private platformLocation: PlatformLocation,
    private sidebarService: SidebarService
  ) {
    this.dataSubscription = this.route.data.subscribe(data => {
      this.showBackButton = !(Boolean(data.root));

      if (data.title) {
        this.title = data.title;
      }
    });

    this.titleSubscription = this.headerService.title.subscribe(title => {
      if (title === null) {
        return;
      }

      this.title = title;
    });
  }

  private goBack() {
    this.platformLocation.back();
  }

  private toggleMenu() {
    this.sidebarService.toggleMenuLeft();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.titleSubscription.unsubscribe();
  }
}
