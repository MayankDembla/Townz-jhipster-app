import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { CustomerAppStaticDataUpdateComponent } from 'app/entities/Townz/customer-app-static-data/customer-app-static-data-update.component';
import { CustomerAppStaticDataService } from 'app/entities/Townz/customer-app-static-data/customer-app-static-data.service';
import { CustomerAppStaticData } from 'app/shared/model/Townz/customer-app-static-data.model';

describe('Component Tests', () => {
  describe('CustomerAppStaticData Management Update Component', () => {
    let comp: CustomerAppStaticDataUpdateComponent;
    let fixture: ComponentFixture<CustomerAppStaticDataUpdateComponent>;
    let service: CustomerAppStaticDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CustomerAppStaticDataUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerAppStaticDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerAppStaticDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerAppStaticDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerAppStaticData(123);
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
        const entity = new CustomerAppStaticData();
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
