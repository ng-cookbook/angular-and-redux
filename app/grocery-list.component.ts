import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {StoreService, buyGroceries, groceryListData, groceryListTotal} from './app-store';

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
        <div>
          <button (click)="buy()">Buy!</button>
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

  buy() {
    this.storeService.store.dispatch(buyGroceries());
  }
}
