
import { Injectable } from '@angular/core';
import {createStore, applyMiddleware, compose} from 'redux';
import {Observable, Observer} from 'rxjs/Rx';
import reduxThunk from 'redux-thunk';
import { createSelector } from 'reselect';

const INIT_GROCERY_LIST = 'INIT_GROCERY_LIST';
const ADD_TO_GROCERY_LIST = 'ADD_TO_GROCERY_LIST';
const CLEAR_GROCERY_LIST = 'CLEAR_GROCERY_LIST';
const UPDATE_PANTRY = 'UPDATE_PANTRY';
const DEBIT_ACCOUNT = 'DEBIT_ACCOUNT';

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

export const clearGroceryList = () => {
  return {
    type: CLEAR_GROCERY_LIST
  };
};

export const updatePantry = (items: any) => {
  return {
    type: UPDATE_PANTRY,
    payload: {
      items
    }
  };
};

export const debitAccount = (amount: number) => {
  return {
    type: DEBIT_ACCOUNT,
    payload: {
      amount
    }
  };
};

const selectGroceryItems = (state: any): any => state.groceryItems;
const selectGroceryList = (state: any): any => state.groceryList;

export const groceryListData = createSelector(
  selectGroceryItems,
  selectGroceryList,
  (items, list) => {
    return Object.entries(list).map(ent => {
      let [name, quantity] = ent;
      let item = items.filter((i: any) => i.name === name)[0];
      let unitPrice = item ? item.price : 0;
      let price = unitPrice * quantity;
      return { name, quantity, unitPrice, price };
    });
  }
);

export const groceryListTotal = createSelector(
  groceryListData,
  (list) => [{
    price: list.reduce((p, i) => p + i.price, 0),
    items: list.reduce((q, i) => q + i.quantity, 0)
  }]
);

export const buyGroceries =
  () =>
    (dispatch: (action: any) => void, getState: () => any) => {

      let state = getState();
      let {groceryList, account} = state;
      let total = groceryListTotal(state)[0];

      if (account.balance - total.price <= 0) {
        // do something!!
      }

      dispatch(updatePantry(groceryList));
      dispatch(debitAccount(total.price));
      dispatch(clearGroceryList());
    };

const initialState: any = {
  groceryItems: [],
  groceryList: {},
  pantry: {
  },
  account: {
    balance: 100.0
  }
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
    case CLEAR_GROCERY_LIST:
      return Object.assign({}, state, {
        groceryList: {}
      });
    case UPDATE_PANTRY:
      let items = Object.entries(action.payload.items).reduce((c: any, ent: any[]) => {
        let [name, quantity] = ent;
        c[name] = (state.pantry[name] || 0) + quantity;
        return c;
      }, {});
      return Object.assign({}, state, {
        pantry: Object.assign({}, state.pantry, items)
      });
    case DEBIT_ACCOUNT:
      return Object.assign({}, state, {
        account: Object.assign({}, state.account, {
          balance: state.account.balance - action.payload.amount
        })
      });
    default:
      return state;
  }
}

const reduxDevToolsExtension = (<any>window).__REDUX_DEVTOOLS_EXTENSION__;

const applicationStore = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(reduxThunk),
    reduxDevToolsExtension && reduxDevToolsExtension()
  ));

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
