import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from 'app/shared/shared.module';
import { CustomerAppStaticDataComponent } from './customer-app-static-data.component';
import { CustomerAppStaticDataDetailComponent } from './customer-app-static-data-detail.component';
import { CustomerAppStaticDataUpdateComponent } from './customer-app-static-data-update.component';
import { CustomerAppStaticDataDeleteDialogComponent } from './customer-app-static-data-delete-dialog.component';
import { customerAppStaticDataRoute } from './customer-app-static-data.route';

@NgModule({
  imports: [MyAppSharedModule, RouterModule.forChild(customerAppStaticDataRoute)],
  declarations: [
    CustomerAppStaticDataComponent,
    CustomerAppStaticDataDetailComponent,
    CustomerAppStaticDataUpdateComponent,
    CustomerAppStaticDataDeleteDialogComponent,
  ],
  entryComponents: [CustomerAppStaticDataDeleteDialogComponent],
})
export class MyAppCustomerAppStaticDataModule {}
