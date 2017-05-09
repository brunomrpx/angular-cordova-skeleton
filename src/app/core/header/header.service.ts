import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeaderService {
  public title: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private _useSidebar: boolean = false;

  get useSidebar() {
    return this._useSidebar;
  }

  set useSidebar(useSidebar: boolean) {
    this._useSidebar = useSidebar;
  }
}
