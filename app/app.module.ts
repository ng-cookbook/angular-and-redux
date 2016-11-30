import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {GroceryItemsComponent} from './grocery-items.component';
import {StoreService} from './app-store';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, GroceryItemsComponent ],
  providers:    [ StoreService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
