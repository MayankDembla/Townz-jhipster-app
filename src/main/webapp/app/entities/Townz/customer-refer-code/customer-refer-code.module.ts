import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from 'app/shared/shared.module';
import { CustomerReferCodeComponent } from './customer-refer-code.component';
import { CustomerReferCodeDetailComponent } from './customer-refer-code-detail.component';
import { CustomerReferCodeUpdateComponent } from './customer-refer-code-update.component';
import { CustomerReferCodeDeleteDialogComponent } from './customer-refer-code-delete-dialog.component';
import { customerReferCodeRoute } from './customer-refer-code.route';

@NgModule({
  imports: [MyAppSharedModule, RouterModule.forChild(customerReferCodeRoute)],
  declarations: [
    CustomerReferCodeComponent,
    CustomerReferCodeDetailComponent,
    CustomerReferCodeUpdateComponent,
    CustomerReferCodeDeleteDialogComponent,
  ],
  entryComponents: [CustomerReferCodeDeleteDialogComponent],
})
export class MyAppCustomerReferCodeModule {}
