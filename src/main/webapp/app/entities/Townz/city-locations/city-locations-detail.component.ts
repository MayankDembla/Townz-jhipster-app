import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICityLocations } from 'app/shared/model/Townz/city-locations.model';

@Component({
  selector: 'jhi-city-locations-detail',
  templateUrl: './city-locations-detail.component.html',
})
export class CityLocationsDetailComponent implements OnInit {
  cityLocations: ICityLocations | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cityLocations }) => (this.cityLocations = cityLocations));
  }

  previousState(): void {
    window.history.back();
  }
}
