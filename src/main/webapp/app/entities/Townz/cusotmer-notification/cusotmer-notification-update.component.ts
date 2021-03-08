import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICusotmerNotification, CusotmerNotification } from 'app/shared/model/Townz/cusotmer-notification.model';
import { CusotmerNotificationService } from './cusotmer-notification.service';
import { ICustomer } from 'app/shared/model/Townz/customer.model';
import { CustomerService } from 'app/entities/Townz/customer/customer.service';

@Component({
  selector: 'jhi-cusotmer-notification-update',
  templateUrl: './cusotmer-notification-update.component.html',
})
export class CusotmerNotificationUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomer[] = [];

  editForm = this.fb.group({
    id: [],
    alert: [],
    createdAt: [],
    updatedAt: [],
    cusomer: [],
  });

  constructor(
    protected cusotmerNotificationService: CusotmerNotificationService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cusotmerNotification }) => {
      if (!cusotmerNotification.id) {
        const today = moment().startOf('day');
        cusotmerNotification.createdAt = today;
        cusotmerNotification.updatedAt = today;
      }

      this.updateForm(cusotmerNotification);

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));
    });
  }

  updateForm(cusotmerNotification: ICusotmerNotification): void {
    this.editForm.patchValue({
      id: cusotmerNotification.id,
      alert: cusotmerNotification.alert,
      createdAt: cusotmerNotification.createdAt ? cusotmerNotification.createdAt.format(DATE_TIME_FORMAT) : null,
      updatedAt: cusotmerNotification.updatedAt ? cusotmerNotification.updatedAt.format(DATE_TIME_FORMAT) : null,
      cusomer: cusotmerNotification.cusomer,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cusotmerNotification = this.createFromForm();
    if (cusotmerNotification.id !== undefined) {
      this.subscribeToSaveResponse(this.cusotmerNotificationService.update(cusotmerNotification));
    } else {
      this.subscribeToSaveResponse(this.cusotmerNotificationService.create(cusotmerNotification));
    }
  }

  private createFromForm(): ICusotmerNotification {
    return {
      ...new CusotmerNotification(),
      id: this.editForm.get(['id'])!.value,
      alert: this.editForm.get(['alert'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      updatedAt: this.editForm.get(['updatedAt'])!.value ? moment(this.editForm.get(['updatedAt'])!.value, DATE_TIME_FORMAT) : undefined,
      cusomer: this.editForm.get(['cusomer'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICusotmerNotification>>): void {
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
