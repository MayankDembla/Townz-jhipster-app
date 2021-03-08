import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';
import { CustomerReferCodeService } from './customer-refer-code.service';

@Component({
  templateUrl: './customer-refer-code-delete-dialog.component.html',
})
export class CustomerReferCodeDeleteDialogComponent {
  customerReferCode?: ICustomerReferCode;

  constructor(
    protected customerReferCodeService: CustomerReferCodeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerReferCodeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerReferCodeListModification');
      this.activeModal.close();
    });
  }
}
