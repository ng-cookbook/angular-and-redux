import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {StoreService} from './app-store';

@Component({
  selector: 'grocery-list',
  template: `
      <div>
        <h2>Grocery List</h2>
        <div *ngFor="let item of items | async">
          {{item.name}} ({{item.quantity}})
        </div>
      </div>`
})
export class GroceryListComponent {
  items: Observable<any>;

  constructor(private storeService: StoreService) {
    this.items = storeService.subscribe((state: any) =>
      Object.entries(state.groceryList).map(ent => ({
        name: ent[0],
        quantity: ent[1]
      })));
  }
}
