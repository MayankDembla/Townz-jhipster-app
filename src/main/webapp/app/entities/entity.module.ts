import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        loadChildren: () => import('./Townz/customer/customer.module').then(m => m.MyAppCustomerModule),
      },
      {
        path: 'address',
        loadChildren: () => import('./Townz/address/address.module').then(m => m.MyAppAddressModule),
      },
      {
        path: 'city',
        loadChildren: () => import('./Townz/city/city.module').then(m => m.MyAppCityModule),
      },
      {
        path: 'city-locations',
        loadChildren: () => import('./Townz/city-locations/city-locations.module').then(m => m.MyAppCityLocationsModule),
      },
      {
        path: 'customer-refer-code',
        loadChildren: () => import('./Townz/customer-refer-code/customer-refer-code.module').then(m => m.MyAppCustomerReferCodeModule),
      },
      {
        path: 'wallet',
        loadChildren: () => import('./Townz/wallet/wallet.module').then(m => m.MyAppWalletModule),
      },
      {
        path: 'customer-app-static-data',
        loadChildren: () =>
          import('./Townz/customer-app-static-data/customer-app-static-data.module').then(m => m.MyAppCustomerAppStaticDataModule),
      },
      {
        path: 'cusotmer-notification',
        loadChildren: () =>
          import('./Townz/cusotmer-notification/cusotmer-notification.module').then(m => m.MyAppCusotmerNotificationModule),
      },
      {
        path: 'cusotmer-app-banner',
        loadChildren: () => import('./Townz/cusotmer-app-banner/cusotmer-app-banner.module').then(m => m.MyAppCusotmerAppBannerModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MyAppEntityModule {}
