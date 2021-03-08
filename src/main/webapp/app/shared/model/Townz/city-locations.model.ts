import { ICity } from 'app/shared/model/Townz/city.model';

export interface ICityLocations {
  id?: number;
  location?: string;
  city?: ICity;
}

export class CityLocations implements ICityLocations {
  constructor(public id?: number, public location?: string, public city?: ICity) {}
}
