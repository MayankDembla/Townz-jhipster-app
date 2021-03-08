import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICusotmerNotification } from 'app/shared/model/Townz/cusotmer-notification.model';

@Component({
  selector: 'jhi-cusotmer-notification-detail',
  templateUrl: './cusotmer-notification-detail.component.html',
})
export class CusotmerNotificationDetailComponent implements OnInit {
  cusotmerNotification: ICusotmerNotification | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cusotmerNotification }) => (this.cusotmerNotification = cusotmerNotification));
  }

  previousState(): void {
    window.history.back();
  }
}
