
import { Injectable } from '@angular/core';
import {createStore} from 'redux';

const INIT_GROCERY_LIST = 'INIT_GROCERY_LIST';

export const initGroceryList = () => {
  return {
    type: INIT_GROCERY_LIST,
    payload: [
      { name: 'Bannas', price: 1.49 },
      { name: 'Apples', price: 0.79 },
      { name: 'Pears', price: 0.98 },
      { name: 'Cereal', price: 3.49 },
      { name: 'Bread', price: 2.50 },
      { name: 'Milk', price: 3.10 },
    ]
  };
};

export function reducer(state: any = {}, action: any) {
  switch (action.type) {
    case INIT_GROCERY_LIST:
      return Object.assign({}, state, {
        groceryItems: action.payload
      });
    default:
      return state;
  }
}

const applicationStore = createStore(reducer);

@Injectable()
export class StoreService {
  get store() {
    return applicationStore;
  }
}
