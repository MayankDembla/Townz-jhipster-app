import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from 'app/shared/shared.module';
import { CusotmerAppBannerComponent } from './cusotmer-app-banner.component';
import { CusotmerAppBannerDetailComponent } from './cusotmer-app-banner-detail.component';
import { CusotmerAppBannerUpdateComponent } from './cusotmer-app-banner-update.component';
import { CusotmerAppBannerDeleteDialogComponent } from './cusotmer-app-banner-delete-dialog.component';
import { cusotmerAppBannerRoute } from './cusotmer-app-banner.route';

@NgModule({
  imports: [MyAppSharedModule, RouterModule.forChild(cusotmerAppBannerRoute)],
  declarations: [
    CusotmerAppBannerComponent,
    CusotmerAppBannerDetailComponent,
    CusotmerAppBannerUpdateComponent,
    CusotmerAppBannerDeleteDialogComponent,
  ],
  entryComponents: [CusotmerAppBannerDeleteDialogComponent],
})
export class MyAppCusotmerAppBannerModule {}
