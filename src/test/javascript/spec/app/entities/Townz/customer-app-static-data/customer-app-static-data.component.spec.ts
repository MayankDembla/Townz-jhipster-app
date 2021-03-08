import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../../test.module';
import { CustomerAppStaticDataComponent } from 'app/entities/Townz/customer-app-static-data/customer-app-static-data.component';
import { CustomerAppStaticDataService } from 'app/entities/Townz/customer-app-static-data/customer-app-static-data.service';
import { CustomerAppStaticData } from 'app/shared/model/Townz/customer-app-static-data.model';

describe('Component Tests', () => {
  describe('CustomerAppStaticData Management Component', () => {
    let comp: CustomerAppStaticDataComponent;
    let fixture: ComponentFixture<CustomerAppStaticDataComponent>;
    let service: CustomerAppStaticDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CustomerAppStaticDataComponent],
      })
        .overrideTemplate(CustomerAppStaticDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerAppStaticDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerAppStaticDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerAppStaticData(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerAppStaticData && comp.customerAppStaticData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
