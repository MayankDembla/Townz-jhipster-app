import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICusotmerNotification } from 'app/shared/model/Townz/cusotmer-notification.model';

type EntityResponseType = HttpResponse<ICusotmerNotification>;
type EntityArrayResponseType = HttpResponse<ICusotmerNotification[]>;

@Injectable({ providedIn: 'root' })
export class CusotmerNotificationService {
  public resourceUrl = SERVER_API_URL + 'api/cusotmer-notifications';

  constructor(protected http: HttpClient) {}

  create(cusotmerNotification: ICusotmerNotification): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cusotmerNotification);
    return this.http
      .post<ICusotmerNotification>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cusotmerNotification: ICusotmerNotification): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cusotmerNotification);
    return this.http
      .put<ICusotmerNotification>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICusotmerNotification>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICusotmerNotification[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cusotmerNotification: ICusotmerNotification): ICusotmerNotification {
    const copy: ICusotmerNotification = Object.assign({}, cusotmerNotification, {
      createdAt:
        cusotmerNotification.createdAt && cusotmerNotification.createdAt.isValid() ? cusotmerNotification.createdAt.toJSON() : undefined,
      updatedAt:
        cusotmerNotification.updatedAt && cusotmerNotification.updatedAt.isValid() ? cusotmerNotification.updatedAt.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
      res.body.updatedAt = res.body.updatedAt ? moment(res.body.updatedAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cusotmerNotification: ICusotmerNotification) => {
        cusotmerNotification.createdAt = cusotmerNotification.createdAt ? moment(cusotmerNotification.createdAt) : undefined;
        cusotmerNotification.updatedAt = cusotmerNotification.updatedAt ? moment(cusotmerNotification.updatedAt) : undefined;
      });
    }
    return res;
  }
}
