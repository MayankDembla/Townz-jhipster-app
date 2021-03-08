import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../../test.module';
import { CustomerReferCodeComponent } from 'app/entities/Townz/customer-refer-code/customer-refer-code.component';
import { CustomerReferCodeService } from 'app/entities/Townz/customer-refer-code/customer-refer-code.service';
import { CustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';

describe('Component Tests', () => {
  describe('CustomerReferCode Management Component', () => {
    let comp: CustomerReferCodeComponent;
    let fixture: ComponentFixture<CustomerReferCodeComponent>;
    let service: CustomerReferCodeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CustomerReferCodeComponent],
      })
        .overrideTemplate(CustomerReferCodeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerReferCodeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerReferCodeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerReferCode(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerReferCodes && comp.customerReferCodes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
