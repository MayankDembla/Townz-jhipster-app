import { ICustomer } from 'app/shared/model/Townz/customer.model';

export interface ICustomerReferCode {
  id?: number;
  customer?: ICustomer;
  customer?: ICustomer;
}

export class CustomerReferCode implements ICustomerReferCode {
  constructor(public id?: number, public customer?: ICustomer, public customer?: ICustomer) {}
}
