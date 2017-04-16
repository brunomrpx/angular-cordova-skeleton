import { Component } from '@angular/core';

import { HeaderService } from './shared/header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private headerService: HeaderService) {
    this.headerService.useSidebar = true;
  }
}
