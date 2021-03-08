import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerReferCode, CustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';
import { CustomerReferCodeService } from './customer-refer-code.service';
import { CustomerReferCodeComponent } from './customer-refer-code.component';
import { CustomerReferCodeDetailComponent } from './customer-refer-code-detail.component';
import { CustomerReferCodeUpdateComponent } from './customer-refer-code-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerReferCodeResolve implements Resolve<ICustomerReferCode> {
  constructor(private service: CustomerReferCodeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerReferCode> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerReferCode: HttpResponse<CustomerReferCode>) => {
          if (customerReferCode.body) {
            return of(customerReferCode.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerReferCode());
  }
}

export const customerReferCodeRoute: Routes = [
  {
    path: '',
    component: CustomerReferCodeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCustomerReferCode.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerReferCodeDetailComponent,
    resolve: {
      customerReferCode: CustomerReferCodeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCustomerReferCode.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerReferCodeUpdateComponent,
    resolve: {
      customerReferCode: CustomerReferCodeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCustomerReferCode.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerReferCodeUpdateComponent,
    resolve: {
      customerReferCode: CustomerReferCodeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCustomerReferCode.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
