import { Component, OnInit, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs/Rx';
import { ViewEncapsulation } from '@angular/core';

import { HeaderService } from '../header/header.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { fadeOut, fadeIn } from '../animations';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.less'],
  animations: [fadeOut, fadeIn]
})
export class FABComponent {
  @ViewChild('fab') fab: ElementRef;
  @Input() class: string;

  private showButton = true;
  private lastScrollTop = 0;
  private pageWrapper: any;

  constructor(private sidebarComponent: SidebarComponent) {
    this.pageWrapper = this.sidebarComponent.pageWrapper.nativeElement;
  }

  @HostListener('body:scroll', ['$event'])
  public onBodyScroll() {
    const box = this.pageWrapper.getBoundingClientRect();

    this.showButton = box.top > this.lastScrollTop;
    this.lastScrollTop = box.top;
  }
}
