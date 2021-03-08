import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICusotmerAppBanner } from 'app/shared/model/Townz/cusotmer-app-banner.model';
import { CusotmerAppBannerService } from './cusotmer-app-banner.service';

@Component({
  templateUrl: './cusotmer-app-banner-delete-dialog.component.html',
})
export class CusotmerAppBannerDeleteDialogComponent {
  cusotmerAppBanner?: ICusotmerAppBanner;

  constructor(
    protected cusotmerAppBannerService: CusotmerAppBannerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cusotmerAppBannerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cusotmerAppBannerListModification');
      this.activeModal.close();
    });
  }
}
