import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {StoreService} from './app-store';

@Component({
  selector: 'pantry-list',
  template: `
      <div>
        <h2>Pantry</h2>
        <div *ngFor="let item of items | async">
          {{item.name}} ({{item.quantity}})
        </div>
      </div>`
})
export class PantryListComponent {
  items: Observable<any>;

  constructor(private storeService: StoreService) {
    this.items = storeService.subscribe((state: any) =>
      Object.entries(state.pantry).map((ent: any) => ({
        name: ent[0],
        quantity: ent[1]
      })));
  }
}
