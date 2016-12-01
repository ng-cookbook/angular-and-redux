import {Component} from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';
import {StoreService, initGroceryList} from './app-store';

@Component({
  selector: 'grocery-items',
  template: `
      <div>
        <h2>Grocery Items</h2>
        <div *ngFor="let item of items | async">
          {{item.name}} ({{item.price | currency:'USD':true}})
        </div>
      </div>`
})
export class GroceryItemsComponent {
  items: Observable<any>;

  constructor(private storeService: StoreService) {
    this.items = storeService.subscribe((state: any) => state.groceryItems);
    setTimeout(() => this.storeService.store.dispatch(initGroceryList()), 2000);
  }
}
