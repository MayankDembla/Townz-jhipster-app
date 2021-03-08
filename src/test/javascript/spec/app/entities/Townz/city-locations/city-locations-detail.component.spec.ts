import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { CityLocationsDetailComponent } from 'app/entities/Townz/city-locations/city-locations-detail.component';
import { CityLocations } from 'app/shared/model/Townz/city-locations.model';

describe('Component Tests', () => {
  describe('CityLocations Management Detail Component', () => {
    let comp: CityLocationsDetailComponent;
    let fixture: ComponentFixture<CityLocationsDetailComponent>;
    const route = ({ data: of({ cityLocations: new CityLocations(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CityLocationsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CityLocationsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CityLocationsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cityLocations on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cityLocations).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
