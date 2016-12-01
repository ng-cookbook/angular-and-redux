import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {StoreService} from './app-store';

import { createSelector } from 'reselect';

const selectGroceryItems = (state: any): any => state.groceryItems;
const selectGroceryList = (state: any): any => state.groceryList;

const groceryListData = createSelector(
  selectGroceryItems,
  selectGroceryList,
  (items, list) => {
    return Object.entries(list).map(ent => {
      let [name, quantity] = ent;
      let item = items.filter((i: any) => i.name === name)[0];
      let unitPrice = item ? item.price : 0;
      let price = unitPrice * quantity;
      return { name, quantity, unitPrice, price };
    });
  }
);

const groceryListTotal = createSelector(
  groceryListData,
  (list) => [{
    price: list.reduce((p, i) => p + i.price, 0),
    items: list.reduce((q, i) => q + i.quantity, 0)
  }]
);

@Component({
  selector: 'grocery-list',
  template: `
      <div>
        <h2>Grocery List</h2>
        <div *ngFor="let item of items | async">
          {{item.name}} -
          {{item.price | currency:'USD':true}}
          ({{item.quantity}} @ {{item.unitPrice | currency:'USD':true}}/item)
        </div>
        <div *ngFor="let total of totals | async">
          <strong>Total:</strong>
          {{total.price | currency:'USD':true}},
          {{total.items}} items
        </div>
      </div>`
})
export class GroceryListComponent {
  items: Observable<any>;
  totals: Observable<any>;

  constructor(private storeService: StoreService) {
    this.items = storeService.subscribe(groceryListData);
    this.totals = storeService.subscribe(groceryListTotal);
  }
}
