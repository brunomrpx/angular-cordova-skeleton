import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.less']
})
export class AlertMessageComponent {
  @Input() private type: string;
  @Input() private hasCloseButton = true;
  private showAlert = true;

  private close() {
    this.showAlert = false;
  }
}
