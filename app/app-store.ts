
import { Injectable } from '@angular/core';
import {createStore} from 'redux';
import {Observable, Observer} from 'rxjs/Rx';

const INIT_GROCERY_LIST = 'INIT_GROCERY_LIST';
const ADD_TO_GROCERY_LIST = 'ADD_TO_GROCERY_LIST';

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

export const addToGroceryList = (item: any) => {
  return {
    type: ADD_TO_GROCERY_LIST,
    payload: item
  };
};

export function reducer(state: any = {}, action: any) {
  switch (action.type) {
    case INIT_GROCERY_LIST:
      return Object.assign({}, state, {
        groceryItems: action.payload
      });
    case ADD_TO_GROCERY_LIST:
      let name = action.payload.name;
      return Object.assign({}, state, {
        groceryList: Object.assign({}, state.groceryList, {
          [name]: (state.groceryList[name] || 0) + 1
        })
      });
    default:
      return state;
  }
}

const reduxDevToolsExtension = (<any>window).__REDUX_DEVTOOLS_EXTENSION__;

const initialState: any = {
  groceryItems: [],
  groceryList: {}
};

const applicationStore = createStore(
  reducer,
  initialState,
  reduxDevToolsExtension && reduxDevToolsExtension());

@Injectable()
export class StoreService {

  get store() {
    return applicationStore;
  }

  subscribe(stateSelector: (state: any) => any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      let unsubscribe = applicationStore.subscribe(() => {
        let selectedState = stateSelector(applicationStore.getState());
        observer.next(selectedState);
      });
      return unsubscribe;
    });
  }
}
