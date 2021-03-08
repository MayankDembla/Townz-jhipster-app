import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';
import { CustomerReferCodeService } from './customer-refer-code.service';
import { CustomerReferCodeDeleteDialogComponent } from './customer-refer-code-delete-dialog.component';

@Component({
  selector: 'jhi-customer-refer-code',
  templateUrl: './customer-refer-code.component.html',
})
export class CustomerReferCodeComponent implements OnInit, OnDestroy {
  customerReferCodes?: ICustomerReferCode[];
  eventSubscriber?: Subscription;

  constructor(
    protected customerReferCodeService: CustomerReferCodeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.customerReferCodeService
      .query()
      .subscribe((res: HttpResponse<ICustomerReferCode[]>) => (this.customerReferCodes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomerReferCodes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomerReferCode): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCustomerReferCodes(): void {
    this.eventSubscriber = this.eventManager.subscribe('customerReferCodeListModification', () => this.loadAll());
  }

  delete(customerReferCode: ICustomerReferCode): void {
    const modalRef = this.modalService.open(CustomerReferCodeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerReferCode = customerReferCode;
  }
}
