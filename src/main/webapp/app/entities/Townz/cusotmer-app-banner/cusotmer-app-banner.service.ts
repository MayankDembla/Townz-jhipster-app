import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICusotmerAppBanner } from 'app/shared/model/Townz/cusotmer-app-banner.model';

type EntityResponseType = HttpResponse<ICusotmerAppBanner>;
type EntityArrayResponseType = HttpResponse<ICusotmerAppBanner[]>;

@Injectable({ providedIn: 'root' })
export class CusotmerAppBannerService {
  public resourceUrl = SERVER_API_URL + 'api/cusotmer-app-banners';

  constructor(protected http: HttpClient) {}

  create(cusotmerAppBanner: ICusotmerAppBanner): Observable<EntityResponseType> {
    return this.http.post<ICusotmerAppBanner>(this.resourceUrl, cusotmerAppBanner, { observe: 'response' });
  }

  update(cusotmerAppBanner: ICusotmerAppBanner): Observable<EntityResponseType> {
    return this.http.put<ICusotmerAppBanner>(this.resourceUrl, cusotmerAppBanner, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICusotmerAppBanner>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICusotmerAppBanner[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
