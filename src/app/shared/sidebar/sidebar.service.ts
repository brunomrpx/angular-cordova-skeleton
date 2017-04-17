import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Menu {
  slideoutInstance?: any
}

@Injectable()
export class SidebarService {
  public menuLeft: BehaviorSubject<Menu> = new BehaviorSubject<Menu>({});
  public menuRight: BehaviorSubject<Menu> = new BehaviorSubject<Menu>({});
}
