import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/Townz/customer.model';

export interface ICusotmerNotification {
  id?: number;
  alert?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  cusomer?: ICustomer;
}

export class CusotmerNotification implements ICusotmerNotification {
  constructor(
    public id?: number,
    public alert?: string,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public cusomer?: ICustomer
  ) {}
}
