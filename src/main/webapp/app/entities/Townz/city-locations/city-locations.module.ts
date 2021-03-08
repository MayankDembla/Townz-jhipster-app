import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from 'app/shared/shared.module';
import { CityLocationsComponent } from './city-locations.component';
import { CityLocationsDetailComponent } from './city-locations-detail.component';
import { CityLocationsUpdateComponent } from './city-locations-update.component';
import { CityLocationsDeleteDialogComponent } from './city-locations-delete-dialog.component';
import { cityLocationsRoute } from './city-locations.route';

@NgModule({
  imports: [MyAppSharedModule, RouterModule.forChild(cityLocationsRoute)],
  declarations: [CityLocationsComponent, CityLocationsDetailComponent, CityLocationsUpdateComponent, CityLocationsDeleteDialogComponent],
  entryComponents: [CityLocationsDeleteDialogComponent],
})
export class MyAppCityLocationsModule {}
