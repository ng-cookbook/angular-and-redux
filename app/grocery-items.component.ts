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
  items: Observable<any[]>;

  constructor(private storeService: StoreService) {

    this.items = Observable.create((observer: Observer<any[]>) => {
      let unsubscribe = this.storeService.store.subscribe(() => {
        let {groceryItems} = this.storeService.store.getState();
        observer.next(groceryItems);
      });
      return unsubscribe;
    });

    setTimeout(() => this.storeService.store.dispatch(initGroceryList()), 2000);
  }
}
