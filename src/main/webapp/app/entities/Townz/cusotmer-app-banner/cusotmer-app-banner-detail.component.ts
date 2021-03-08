import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICusotmerAppBanner } from 'app/shared/model/Townz/cusotmer-app-banner.model';

@Component({
  selector: 'jhi-cusotmer-app-banner-detail',
  templateUrl: './cusotmer-app-banner-detail.component.html',
})
export class CusotmerAppBannerDetailComponent implements OnInit {
  cusotmerAppBanner: ICusotmerAppBanner | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cusotmerAppBanner }) => (this.cusotmerAppBanner = cusotmerAppBanner));
  }

  previousState(): void {
    window.history.back();
  }
}
