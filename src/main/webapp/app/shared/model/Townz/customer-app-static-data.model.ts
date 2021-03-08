export interface ICustomerAppStaticData {
  id?: number;
  heading?: string;
  content?: string;
}

export class CustomerAppStaticData implements ICustomerAppStaticData {
  constructor(public id?: number, public heading?: string, public content?: string) {}
}
