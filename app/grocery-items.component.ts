import {Component, OnDestroy} from '@angular/core';
import {StoreService, initGroceryList} from './app-store';

@Component({
  selector: 'grocery-items',
  template: `
      <div>
        <h2>Grocery Items</h2>
        <div *ngFor="let item of items">
          {{item.name}} ({{item.price | currency:'USD':true}})
        </div>
      </div>`
})
export class GroceryItemsComponent implements OnDestroy {

  unsubscribe: () => void;
  items: any[];

  constructor(private storeService: StoreService) {

    this.unsubscribe = this.storeService.store.subscribe(() => {
      let {groceryItems} = this.storeService.store.getState();
      this.items = groceryItems;
    });

    setTimeout(() => this.storeService.store.dispatch(initGroceryList()), 2000);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
