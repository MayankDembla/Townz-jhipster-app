import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';

type EntityResponseType = HttpResponse<ICustomerReferCode>;
type EntityArrayResponseType = HttpResponse<ICustomerReferCode[]>;

@Injectable({ providedIn: 'root' })
export class CustomerReferCodeService {
  public resourceUrl = SERVER_API_URL + 'api/customer-refer-codes';

  constructor(protected http: HttpClient) {}

  create(customerReferCode: ICustomerReferCode): Observable<EntityResponseType> {
    return this.http.post<ICustomerReferCode>(this.resourceUrl, customerReferCode, { observe: 'response' });
  }

  update(customerReferCode: ICustomerReferCode): Observable<EntityResponseType> {
    return this.http.put<ICustomerReferCode>(this.resourceUrl, customerReferCode, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerReferCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerReferCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
