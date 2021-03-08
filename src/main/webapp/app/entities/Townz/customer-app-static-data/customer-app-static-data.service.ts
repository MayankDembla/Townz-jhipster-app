import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerAppStaticData } from 'app/shared/model/Townz/customer-app-static-data.model';

type EntityResponseType = HttpResponse<ICustomerAppStaticData>;
type EntityArrayResponseType = HttpResponse<ICustomerAppStaticData[]>;

@Injectable({ providedIn: 'root' })
export class CustomerAppStaticDataService {
  public resourceUrl = SERVER_API_URL + 'api/customer-app-static-data';

  constructor(protected http: HttpClient) {}

  create(customerAppStaticData: ICustomerAppStaticData): Observable<EntityResponseType> {
    return this.http.post<ICustomerAppStaticData>(this.resourceUrl, customerAppStaticData, { observe: 'response' });
  }

  update(customerAppStaticData: ICustomerAppStaticData): Observable<EntityResponseType> {
    return this.http.put<ICustomerAppStaticData>(this.resourceUrl, customerAppStaticData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerAppStaticData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerAppStaticData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
