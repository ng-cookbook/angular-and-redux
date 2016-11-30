import { Component } from '@angular/core';

@Component({
  selector: 'grocery-items',
  template: `
      <div>
        <div *ngFor="let item of items">
          {{item.name}} ({{item.price | currency:'USD':true}})
        </div>
      </div>`
})
export class GroceryItemsComponent {

  items: any[] = [
    { name: "Bannas", price: 1.49 },
    { name: "Apples", price: 0.79 },
    { name: "Pears", price: 0.98 },
    { name: "Cereal", price: 3.49 },
    { name: "Bread", price: 2.50 },
    { name: "Milk", price: 3.10 },
  ];

}
