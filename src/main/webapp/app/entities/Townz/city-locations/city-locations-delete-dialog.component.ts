import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICityLocations } from 'app/shared/model/Townz/city-locations.model';
import { CityLocationsService } from './city-locations.service';

@Component({
  templateUrl: './city-locations-delete-dialog.component.html',
})
export class CityLocationsDeleteDialogComponent {
  cityLocations?: ICityLocations;

  constructor(
    protected cityLocationsService: CityLocationsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cityLocationsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cityLocationsListModification');
      this.activeModal.close();
    });
  }
}
