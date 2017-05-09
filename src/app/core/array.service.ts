import { Injectable } from '@angular/core';

export enum SortOrder {
  ASC,
  DESC
}

@Injectable()
export class ArrayService {
  public sort(list: any[], field: string, type: string, order: SortOrder = SortOrder.ASC) {
    let sortMethod;

    if (type === 'string') {
      sortMethod = this.sortString;
    } else {
      sortMethod = this.sortGenericValue;
    }

    sortMethod(list, field, order);
  }

  public sortGenericValue(list: any[], field: string, order: SortOrder) {
    list.sort((a, b) => {
      if (order === SortOrder.ASC) {
        return a[field] - b[field];
      }

      return b[field] - a[field];
    });
  }

  public sortString(list: any[], field: string, order: SortOrder) {
    list.sort((a, b) => {
      if (order === SortOrder.ASC) {
        return a[field].localeCompare(b[field]);
      }

      return b[field].localeCompare(a[field]);
    });
  }
}
