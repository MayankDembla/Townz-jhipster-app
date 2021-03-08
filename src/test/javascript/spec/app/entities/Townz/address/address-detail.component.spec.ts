import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { AddressDetailComponent } from 'app/entities/Townz/address/address-detail.component';
import { Address } from 'app/shared/model/Townz/address.model';

describe('Component Tests', () => {
  describe('Address Management Detail Component', () => {
    let comp: AddressDetailComponent;
    let fixture: ComponentFixture<AddressDetailComponent>;
    const route = ({ data: of({ address: new Address(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [AddressDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AddressDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AddressDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load address on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.address).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
