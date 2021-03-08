import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICustomerReferCode, CustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';
import { CustomerReferCodeService } from './customer-refer-code.service';
import { ICustomer } from 'app/shared/model/Townz/customer.model';
import { CustomerService } from 'app/entities/Townz/customer/customer.service';

@Component({
  selector: 'jhi-customer-refer-code-update',
  templateUrl: './customer-refer-code-update.component.html',
})
export class CustomerReferCodeUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomer[] = [];

  editForm = this.fb.group({
    id: [],
    customer: [],
  });

  constructor(
    protected customerReferCodeService: CustomerReferCodeService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerReferCode }) => {
      this.updateForm(customerReferCode);

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));
    });
  }

  updateForm(customerReferCode: ICustomerReferCode): void {
    this.editForm.patchValue({
      id: customerReferCode.id,
      customer: customerReferCode.customer,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerReferCode = this.createFromForm();
    if (customerReferCode.id !== undefined) {
      this.subscribeToSaveResponse(this.customerReferCodeService.update(customerReferCode));
    } else {
      this.subscribeToSaveResponse(this.customerReferCodeService.create(customerReferCode));
    }
  }

  private createFromForm(): ICustomerReferCode {
    return {
      ...new CustomerReferCode(),
      id: this.editForm.get(['id'])!.value,
      customer: this.editForm.get(['customer'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerReferCode>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICustomer): any {
    return item.id;
  }
}
