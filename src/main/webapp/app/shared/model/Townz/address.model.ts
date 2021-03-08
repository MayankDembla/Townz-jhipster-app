import { ICity } from 'app/shared/model/Townz/city.model';
import { ICustomer } from 'app/shared/model/Townz/customer.model';

export interface IAddress {
  id?: number;
  address?: string;
  location?: string;
  pincode?: number;
  city?: ICity;
  customer?: ICustomer;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public address?: string,
    public location?: string,
    public pincode?: number,
    public city?: ICity,
    public customer?: ICustomer
  ) {}
}
