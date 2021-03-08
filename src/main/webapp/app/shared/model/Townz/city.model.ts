import { IAddress } from 'app/shared/model/Townz/address.model';
import { ICityLocations } from 'app/shared/model/Townz/city-locations.model';

export interface ICity {
  id?: number;
  name?: string;
  address?: IAddress;
  citylocations?: ICityLocations[];
}

export class City implements ICity {
  constructor(public id?: number, public name?: string, public address?: IAddress, public citylocations?: ICityLocations[]) {}
}
