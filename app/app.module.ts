import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {GroceryItemsComponent} from "./grocery-items.component";

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, GroceryItemsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
