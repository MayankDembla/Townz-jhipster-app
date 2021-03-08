import { Moment } from 'moment';
import { ICustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';
import { IWallet } from 'app/shared/model/Townz/wallet.model';
import { IAddress } from 'app/shared/model/Townz/address.model';
import { ICusotmerNotification } from 'app/shared/model/Townz/cusotmer-notification.model';

export interface ICustomer {
  id?: number;
  name?: string;
  token?: string;
  phone?: string;
  sphone?: string;
  email?: string;
  profileimage?: string;
  active?: boolean;
  isFirstBooking?: boolean;
  timecreated?: Moment;
  referFromCustomerId?: ICustomerReferCode;
  wallet?: IWallet;
  addresses?: IAddress[];
  referToCustomerIds?: ICustomerReferCode[];
  notifications?: ICusotmerNotification[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public name?: string,
    public token?: string,
    public phone?: string,
    public sphone?: string,
    public email?: string,
    public profileimage?: string,
    public active?: boolean,
    public isFirstBooking?: boolean,
    public timecreated?: Moment,
    public referFromCustomerId?: ICustomerReferCode,
    public wallet?: IWallet,
    public addresses?: IAddress[],
    public referToCustomerIds?: ICustomerReferCode[],
    public notifications?: ICusotmerNotification[]
  ) {
    this.active = this.active || false;
    this.isFirstBooking = this.isFirstBooking || false;
  }
}
