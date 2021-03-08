import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';

@Component({
  selector: 'jhi-customer-refer-code-detail',
  templateUrl: './customer-refer-code-detail.component.html',
})
export class CustomerReferCodeDetailComponent implements OnInit {
  customerReferCode: ICustomerReferCode | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerReferCode }) => (this.customerReferCode = customerReferCode));
  }

  previousState(): void {
    window.history.back();
  }
}
