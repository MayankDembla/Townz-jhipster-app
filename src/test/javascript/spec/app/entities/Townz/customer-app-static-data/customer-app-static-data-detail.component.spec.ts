import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { CustomerAppStaticDataDetailComponent } from 'app/entities/Townz/customer-app-static-data/customer-app-static-data-detail.component';
import { CustomerAppStaticData } from 'app/shared/model/Townz/customer-app-static-data.model';

describe('Component Tests', () => {
  describe('CustomerAppStaticData Management Detail Component', () => {
    let comp: CustomerAppStaticDataDetailComponent;
    let fixture: ComponentFixture<CustomerAppStaticDataDetailComponent>;
    const route = ({ data: of({ customerAppStaticData: new CustomerAppStaticData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CustomerAppStaticDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerAppStaticDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerAppStaticDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customerAppStaticData on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerAppStaticData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
