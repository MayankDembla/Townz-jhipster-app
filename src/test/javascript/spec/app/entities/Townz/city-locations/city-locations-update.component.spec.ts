import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { CityLocationsUpdateComponent } from 'app/entities/Townz/city-locations/city-locations-update.component';
import { CityLocationsService } from 'app/entities/Townz/city-locations/city-locations.service';
import { CityLocations } from 'app/shared/model/Townz/city-locations.model';

describe('Component Tests', () => {
  describe('CityLocations Management Update Component', () => {
    let comp: CityLocationsUpdateComponent;
    let fixture: ComponentFixture<CityLocationsUpdateComponent>;
    let service: CityLocationsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CityLocationsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CityLocationsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CityLocationsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CityLocationsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CityLocations(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CityLocations();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
