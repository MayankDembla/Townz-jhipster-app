import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICityLocations } from 'app/shared/model/Townz/city-locations.model';
import { CityLocationsService } from './city-locations.service';
import { CityLocationsDeleteDialogComponent } from './city-locations-delete-dialog.component';

@Component({
  selector: 'jhi-city-locations',
  templateUrl: './city-locations.component.html',
})
export class CityLocationsComponent implements OnInit, OnDestroy {
  cityLocations?: ICityLocations[];
  eventSubscriber?: Subscription;

  constructor(
    protected cityLocationsService: CityLocationsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.cityLocationsService.query().subscribe((res: HttpResponse<ICityLocations[]>) => (this.cityLocations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCityLocations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICityLocations): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCityLocations(): void {
    this.eventSubscriber = this.eventManager.subscribe('cityLocationsListModification', () => this.loadAll());
  }

  delete(cityLocations: ICityLocations): void {
    const modalRef = this.modalService.open(CityLocationsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cityLocations = cityLocations;
  }
}
