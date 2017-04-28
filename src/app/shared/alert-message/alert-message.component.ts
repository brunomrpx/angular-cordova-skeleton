import { Component, Input, HostBinding } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';

import { fadeOut } from '../animations';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.less'],
  animations: [fadeOut]
})
export class AlertMessageComponent {
  @Input() private type: string;
  @Input() private hasCloseButton = true;

  private showAlert = true;

  private close() {
    this.showAlert = false;
  }
}
