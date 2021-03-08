import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../../test.module';
import { CityLocationsComponent } from 'app/entities/Townz/city-locations/city-locations.component';
import { CityLocationsService } from 'app/entities/Townz/city-locations/city-locations.service';
import { CityLocations } from 'app/shared/model/Townz/city-locations.model';

describe('Component Tests', () => {
  describe('CityLocations Management Component', () => {
    let comp: CityLocationsComponent;
    let fixture: ComponentFixture<CityLocationsComponent>;
    let service: CityLocationsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CityLocationsComponent],
      })
        .overrideTemplate(CityLocationsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CityLocationsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CityLocationsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CityLocations(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cityLocations && comp.cityLocations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
