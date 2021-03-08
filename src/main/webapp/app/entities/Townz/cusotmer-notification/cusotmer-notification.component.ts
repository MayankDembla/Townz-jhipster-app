import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICusotmerNotification } from 'app/shared/model/Townz/cusotmer-notification.model';
import { CusotmerNotificationService } from './cusotmer-notification.service';
import { CusotmerNotificationDeleteDialogComponent } from './cusotmer-notification-delete-dialog.component';

@Component({
  selector: 'jhi-cusotmer-notification',
  templateUrl: './cusotmer-notification.component.html',
})
export class CusotmerNotificationComponent implements OnInit, OnDestroy {
  cusotmerNotifications?: ICusotmerNotification[];
  eventSubscriber?: Subscription;

  constructor(
    protected cusotmerNotificationService: CusotmerNotificationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.cusotmerNotificationService
      .query()
      .subscribe((res: HttpResponse<ICusotmerNotification[]>) => (this.cusotmerNotifications = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCusotmerNotifications();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICusotmerNotification): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCusotmerNotifications(): void {
    this.eventSubscriber = this.eventManager.subscribe('cusotmerNotificationListModification', () => this.loadAll());
  }

  delete(cusotmerNotification: ICusotmerNotification): void {
    const modalRef = this.modalService.open(CusotmerNotificationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cusotmerNotification = cusotmerNotification;
  }
}
