import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse-content',
  templateUrl: './collapse-content.component.html'
})
export class CollapseContentComponent {
  @Input() private contentOpened = false;

  private toggleContent() {
    this.contentOpened = !this.contentOpened;
  }
}
