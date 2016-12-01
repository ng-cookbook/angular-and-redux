import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {GroceryItemsComponent} from './grocery-items.component';
import {StoreService} from './app-store';
import {GroceryListComponent} from './grocery-list.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, GroceryItemsComponent, GroceryListComponent ],
  providers:    [ StoreService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
