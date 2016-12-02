import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import {GroceryItemsComponent} from './grocery-items.component';
import {StoreService} from './app-store';
import {GroceryListComponent} from './grocery-list.component';
import {PantryListComponent} from './pantry.component';
import {AccountDetailsComponent} from './account.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, GroceryItemsComponent, GroceryListComponent, PantryListComponent, AccountDetailsComponent ],
  providers:    [ StoreService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
