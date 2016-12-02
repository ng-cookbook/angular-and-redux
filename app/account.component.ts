import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {StoreService} from './app-store';

@Component({
  selector: 'account-details',
  template: `
      <div>
        <h2>Account</h2>
        <div *ngFor="let acct of accounts | async">
          Balance: {{acct.balance | currency:'USD':true}}
        </div>
      </div>`
})
export class AccountDetailsComponent {
  accounts: Observable<any>;

  constructor(private storeService: StoreService) {
    this.accounts = storeService.subscribe((state: any) => [state.account]);
  }
}
