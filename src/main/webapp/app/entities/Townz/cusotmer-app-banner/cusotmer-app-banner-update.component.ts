import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICusotmerAppBanner, CusotmerAppBanner } from 'app/shared/model/Townz/cusotmer-app-banner.model';
import { CusotmerAppBannerService } from './cusotmer-app-banner.service';

@Component({
  selector: 'jhi-cusotmer-app-banner-update',
  templateUrl: './cusotmer-app-banner-update.component.html',
})
export class CusotmerAppBannerUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    image: [],
    location: [],
  });

  constructor(
    protected cusotmerAppBannerService: CusotmerAppBannerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cusotmerAppBanner }) => {
      this.updateForm(cusotmerAppBanner);
    });
  }

  updateForm(cusotmerAppBanner: ICusotmerAppBanner): void {
    this.editForm.patchValue({
      id: cusotmerAppBanner.id,
      image: cusotmerAppBanner.image,
      location: cusotmerAppBanner.location,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cusotmerAppBanner = this.createFromForm();
    if (cusotmerAppBanner.id !== undefined) {
      this.subscribeToSaveResponse(this.cusotmerAppBannerService.update(cusotmerAppBanner));
    } else {
      this.subscribeToSaveResponse(this.cusotmerAppBannerService.create(cusotmerAppBanner));
    }
  }

  private createFromForm(): ICusotmerAppBanner {
    return {
      ...new CusotmerAppBanner(),
      id: this.editForm.get(['id'])!.value,
      image: this.editForm.get(['image'])!.value,
      location: this.editForm.get(['location'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICusotmerAppBanner>>): void {
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
