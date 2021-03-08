import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { CustomerReferCodeUpdateComponent } from 'app/entities/Townz/customer-refer-code/customer-refer-code-update.component';
import { CustomerReferCodeService } from 'app/entities/Townz/customer-refer-code/customer-refer-code.service';
import { CustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';

describe('Component Tests', () => {
  describe('CustomerReferCode Management Update Component', () => {
    let comp: CustomerReferCodeUpdateComponent;
    let fixture: ComponentFixture<CustomerReferCodeUpdateComponent>;
    let service: CustomerReferCodeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CustomerReferCodeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerReferCodeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerReferCodeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerReferCodeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerReferCode(123);
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
        const entity = new CustomerReferCode();
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
