import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICusotmerNotification } from 'app/shared/model/Townz/cusotmer-notification.model';
import { CusotmerNotificationService } from './cusotmer-notification.service';

@Component({
  templateUrl: './cusotmer-notification-delete-dialog.component.html',
})
export class CusotmerNotificationDeleteDialogComponent {
  cusotmerNotification?: ICusotmerNotification;

  constructor(
    protected cusotmerNotificationService: CusotmerNotificationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cusotmerNotificationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cusotmerNotificationListModification');
      this.activeModal.close();
    });
  }
}
