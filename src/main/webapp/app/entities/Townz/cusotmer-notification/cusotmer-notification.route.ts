import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICusotmerNotification, CusotmerNotification } from 'app/shared/model/Townz/cusotmer-notification.model';
import { CusotmerNotificationService } from './cusotmer-notification.service';
import { CusotmerNotificationComponent } from './cusotmer-notification.component';
import { CusotmerNotificationDetailComponent } from './cusotmer-notification-detail.component';
import { CusotmerNotificationUpdateComponent } from './cusotmer-notification-update.component';

@Injectable({ providedIn: 'root' })
export class CusotmerNotificationResolve implements Resolve<ICusotmerNotification> {
  constructor(private service: CusotmerNotificationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICusotmerNotification> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cusotmerNotification: HttpResponse<CusotmerNotification>) => {
          if (cusotmerNotification.body) {
            return of(cusotmerNotification.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CusotmerNotification());
  }
}

export const cusotmerNotificationRoute: Routes = [
  {
    path: '',
    component: CusotmerNotificationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCusotmerNotification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CusotmerNotificationDetailComponent,
    resolve: {
      cusotmerNotification: CusotmerNotificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCusotmerNotification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CusotmerNotificationUpdateComponent,
    resolve: {
      cusotmerNotification: CusotmerNotificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCusotmerNotification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CusotmerNotificationUpdateComponent,
    resolve: {
      cusotmerNotification: CusotmerNotificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCusotmerNotification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
