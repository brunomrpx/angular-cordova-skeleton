import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="checkbox" [class.checked]="checkbox.checked">
      <input #checkbox type="checkbox" [id]="idAttr" [formControl]="control">
      <span class="checkbox__icon"></span>
      <label class="checkbox__label" [for]="idAttr">
        <ng-content></ng-content>
      </label>
    </div>
  `,
  styleUrls: ['./checkbox.component.less']
})
export class CheckboxComponent {
  @Input() private control: FormControl;
  @Input() private idAttr: string;

  constructor(private formBuilder: FormBuilder) {
    const formGroup = this.formBuilder.group({
      checkbox: []
    });

    this.control = formGroup.controls['checkbox'] as FormControl;
  }
}
