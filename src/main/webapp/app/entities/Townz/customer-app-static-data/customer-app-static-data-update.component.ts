import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICustomerAppStaticData, CustomerAppStaticData } from 'app/shared/model/Townz/customer-app-static-data.model';
import { CustomerAppStaticDataService } from './customer-app-static-data.service';

@Component({
  selector: 'jhi-customer-app-static-data-update',
  templateUrl: './customer-app-static-data-update.component.html',
})
export class CustomerAppStaticDataUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    heading: [],
    content: [],
  });

  constructor(
    protected customerAppStaticDataService: CustomerAppStaticDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerAppStaticData }) => {
      this.updateForm(customerAppStaticData);
    });
  }

  updateForm(customerAppStaticData: ICustomerAppStaticData): void {
    this.editForm.patchValue({
      id: customerAppStaticData.id,
      heading: customerAppStaticData.heading,
      content: customerAppStaticData.content,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerAppStaticData = this.createFromForm();
    if (customerAppStaticData.id !== undefined) {
      this.subscribeToSaveResponse(this.customerAppStaticDataService.update(customerAppStaticData));
    } else {
      this.subscribeToSaveResponse(this.customerAppStaticDataService.create(customerAppStaticData));
    }
  }

  private createFromForm(): ICustomerAppStaticData {
    return {
      ...new CustomerAppStaticData(),
      id: this.editForm.get(['id'])!.value,
      heading: this.editForm.get(['heading'])!.value,
      content: this.editForm.get(['content'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerAppStaticData>>): void {
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
}
