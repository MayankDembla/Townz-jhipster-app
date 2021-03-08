import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from 'app/shared/shared.module';
import { CusotmerNotificationComponent } from './cusotmer-notification.component';
import { CusotmerNotificationDetailComponent } from './cusotmer-notification-detail.component';
import { CusotmerNotificationUpdateComponent } from './cusotmer-notification-update.component';
import { CusotmerNotificationDeleteDialogComponent } from './cusotmer-notification-delete-dialog.component';
import { cusotmerNotificationRoute } from './cusotmer-notification.route';

@NgModule({
  imports: [MyAppSharedModule, RouterModule.forChild(cusotmerNotificationRoute)],
  declarations: [
    CusotmerNotificationComponent,
    CusotmerNotificationDetailComponent,
    CusotmerNotificationUpdateComponent,
    CusotmerNotificationDeleteDialogComponent,
  ],
  entryComponents: [CusotmerNotificationDeleteDialogComponent],
})
export class MyAppCusotmerNotificationModule {}
