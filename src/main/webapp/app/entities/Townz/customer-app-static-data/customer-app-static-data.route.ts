import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerAppStaticData, CustomerAppStaticData } from 'app/shared/model/Townz/customer-app-static-data.model';
import { CustomerAppStaticDataService } from './customer-app-static-data.service';
import { CustomerAppStaticDataComponent } from './customer-app-static-data.component';
import { CustomerAppStaticDataDetailComponent } from './customer-app-static-data-detail.component';
import { CustomerAppStaticDataUpdateComponent } from './customer-app-static-data-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerAppStaticDataResolve implements Resolve<ICustomerAppStaticData> {
  constructor(private service: CustomerAppStaticDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerAppStaticData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerAppStaticData: HttpResponse<CustomerAppStaticData>) => {
          if (customerAppStaticData.body) {
            return of(customerAppStaticData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerAppStaticData());
  }
}

export const customerAppStaticDataRoute: Routes = [
  {
    path: '',
    component: CustomerAppStaticDataComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCustomerAppStaticData.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerAppStaticDataDetailComponent,
    resolve: {
      customerAppStaticData: CustomerAppStaticDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCustomerAppStaticData.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerAppStaticDataUpdateComponent,
    resolve: {
      customerAppStaticData: CustomerAppStaticDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCustomerAppStaticData.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerAppStaticDataUpdateComponent,
    resolve: {
      customerAppStaticData: CustomerAppStaticDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCustomerAppStaticData.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
