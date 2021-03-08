import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerAppStaticData } from 'app/shared/model/Townz/customer-app-static-data.model';
import { CustomerAppStaticDataService } from './customer-app-static-data.service';

@Component({
  templateUrl: './customer-app-static-data-delete-dialog.component.html',
})
export class CustomerAppStaticDataDeleteDialogComponent {
  customerAppStaticData?: ICustomerAppStaticData;

  constructor(
    protected customerAppStaticDataService: CustomerAppStaticDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerAppStaticDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerAppStaticDataListModification');
      this.activeModal.close();
    });
  }
}
