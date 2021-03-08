import { ICustomer } from 'app/shared/model/Townz/customer.model';

export interface IWallet {
  id?: number;
  walletId?: number;
  balance?: number;
  credit?: number;
  customer?: ICustomer;
}

export class Wallet implements IWallet {
  constructor(public id?: number, public walletId?: number, public balance?: number, public credit?: number, public customer?: ICustomer) {}
}
