import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICityLocations, CityLocations } from 'app/shared/model/Townz/city-locations.model';
import { CityLocationsService } from './city-locations.service';
import { ICity } from 'app/shared/model/Townz/city.model';
import { CityService } from 'app/entities/Townz/city/city.service';

@Component({
  selector: 'jhi-city-locations-update',
  templateUrl: './city-locations-update.component.html',
})
export class CityLocationsUpdateComponent implements OnInit {
  isSaving = false;
  cities: ICity[] = [];

  editForm = this.fb.group({
    id: [],
    location: [],
    city: [],
  });

  constructor(
    protected cityLocationsService: CityLocationsService,
    protected cityService: CityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cityLocations }) => {
      this.updateForm(cityLocations);

      this.cityService.query().subscribe((res: HttpResponse<ICity[]>) => (this.cities = res.body || []));
    });
  }

  updateForm(cityLocations: ICityLocations): void {
    this.editForm.patchValue({
      id: cityLocations.id,
      location: cityLocations.location,
      city: cityLocations.city,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cityLocations = this.createFromForm();
    if (cityLocations.id !== undefined) {
      this.subscribeToSaveResponse(this.cityLocationsService.update(cityLocations));
    } else {
      this.subscribeToSaveResponse(this.cityLocationsService.create(cityLocations));
    }
  }

  private createFromForm(): ICityLocations {
    return {
      ...new CityLocations(),
      id: this.editForm.get(['id'])!.value,
      location: this.editForm.get(['location'])!.value,
      city: this.editForm.get(['city'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICityLocations>>): void {
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

  trackById(index: number, item: ICity): any {
    return item.id;
  }
}
