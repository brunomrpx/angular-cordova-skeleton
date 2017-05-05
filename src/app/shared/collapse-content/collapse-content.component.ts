import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse-content',
  templateUrl: './collapse-content.component.html',
  styleUrls: ['./collapse-content.component.less']
})
export class CollapseContentComponent {
  @Input() private contentOpened = false;
  @Input() private reverseContent = false;

  private toggleContent() {
    this.contentOpened = !this.contentOpened;
  }
}
