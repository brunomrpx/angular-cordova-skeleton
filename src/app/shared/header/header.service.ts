import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeaderService {
  private _title: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _useSidebar: boolean = false;

  get useSidebar() {
    return this._useSidebar;
  }

  set useSidebar(useSidebar: boolean) {
    this._useSidebar = useSidebar;
  }

  get title(): BehaviorSubject<string> | string {
    return this._title;
  }

  set title(title: BehaviorSubject<string> | string) {
   this._title.next(title as string);
  }
}
