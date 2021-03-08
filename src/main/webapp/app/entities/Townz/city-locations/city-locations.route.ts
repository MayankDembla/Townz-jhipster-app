import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICityLocations, CityLocations } from 'app/shared/model/Townz/city-locations.model';
import { CityLocationsService } from './city-locations.service';
import { CityLocationsComponent } from './city-locations.component';
import { CityLocationsDetailComponent } from './city-locations-detail.component';
import { CityLocationsUpdateComponent } from './city-locations-update.component';

@Injectable({ providedIn: 'root' })
export class CityLocationsResolve implements Resolve<ICityLocations> {
  constructor(private service: CityLocationsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICityLocations> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cityLocations: HttpResponse<CityLocations>) => {
          if (cityLocations.body) {
            return of(cityLocations.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CityLocations());
  }
}

export const cityLocationsRoute: Routes = [
  {
    path: '',
    component: CityLocationsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCityLocations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CityLocationsDetailComponent,
    resolve: {
      cityLocations: CityLocationsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCityLocations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CityLocationsUpdateComponent,
    resolve: {
      cityLocations: CityLocationsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCityLocations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CityLocationsUpdateComponent,
    resolve: {
      cityLocations: CityLocationsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myApp.townzCityLocations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
