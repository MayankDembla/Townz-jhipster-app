import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerAppStaticData } from 'app/shared/model/Townz/customer-app-static-data.model';

@Component({
  selector: 'jhi-customer-app-static-data-detail',
  templateUrl: './customer-app-static-data-detail.component.html',
})
export class CustomerAppStaticDataDetailComponent implements OnInit {
  customerAppStaticData: ICustomerAppStaticData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerAppStaticData }) => (this.customerAppStaticData = customerAppStaticData));
  }

  previousState(): void {
    window.history.back();
  }
}
