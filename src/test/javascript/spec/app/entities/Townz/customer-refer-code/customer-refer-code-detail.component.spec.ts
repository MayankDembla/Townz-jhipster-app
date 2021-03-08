import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { CustomerReferCodeDetailComponent } from 'app/entities/Townz/customer-refer-code/customer-refer-code-detail.component';
import { CustomerReferCode } from 'app/shared/model/Townz/customer-refer-code.model';

describe('Component Tests', () => {
  describe('CustomerReferCode Management Detail Component', () => {
    let comp: CustomerReferCodeDetailComponent;
    let fixture: ComponentFixture<CustomerReferCodeDetailComponent>;
    const route = ({ data: of({ customerReferCode: new CustomerReferCode(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CustomerReferCodeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerReferCodeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerReferCodeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customerReferCode on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerReferCode).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
