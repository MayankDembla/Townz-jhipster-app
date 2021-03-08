import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerAppStaticData } from 'app/shared/model/Townz/customer-app-static-data.model';
import { CustomerAppStaticDataService } from './customer-app-static-data.service';
import { CustomerAppStaticDataDeleteDialogComponent } from './customer-app-static-data-delete-dialog.component';

@Component({
  selector: 'jhi-customer-app-static-data',
  templateUrl: './customer-app-static-data.component.html',
})
export class CustomerAppStaticDataComponent implements OnInit, OnDestroy {
  customerAppStaticData?: ICustomerAppStaticData[];
  eventSubscriber?: Subscription;

  constructor(
    protected customerAppStaticDataService: CustomerAppStaticDataService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.customerAppStaticDataService
      .query()
      .subscribe((res: HttpResponse<ICustomerAppStaticData[]>) => (this.customerAppStaticData = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomerAppStaticData();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomerAppStaticData): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCustomerAppStaticData(): void {
    this.eventSubscriber = this.eventManager.subscribe('customerAppStaticDataListModification', () => this.loadAll());
  }

  delete(customerAppStaticData: ICustomerAppStaticData): void {
    const modalRef = this.modalService.open(CustomerAppStaticDataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerAppStaticData = customerAppStaticData;
  }
}
