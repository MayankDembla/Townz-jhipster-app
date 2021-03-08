import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICusotmerAppBanner } from 'app/shared/model/Townz/cusotmer-app-banner.model';
import { CusotmerAppBannerService } from './cusotmer-app-banner.service';
import { CusotmerAppBannerDeleteDialogComponent } from './cusotmer-app-banner-delete-dialog.component';

@Component({
  selector: 'jhi-cusotmer-app-banner',
  templateUrl: './cusotmer-app-banner.component.html',
})
export class CusotmerAppBannerComponent implements OnInit, OnDestroy {
  cusotmerAppBanners?: ICusotmerAppBanner[];
  eventSubscriber?: Subscription;

  constructor(
    protected cusotmerAppBannerService: CusotmerAppBannerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.cusotmerAppBannerService
      .query()
      .subscribe((res: HttpResponse<ICusotmerAppBanner[]>) => (this.cusotmerAppBanners = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCusotmerAppBanners();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICusotmerAppBanner): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCusotmerAppBanners(): void {
    this.eventSubscriber = this.eventManager.subscribe('cusotmerAppBannerListModification', () => this.loadAll());
  }

  delete(cusotmerAppBanner: ICusotmerAppBanner): void {
    const modalRef = this.modalService.open(CusotmerAppBannerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cusotmerAppBanner = cusotmerAppBanner;
  }
}
