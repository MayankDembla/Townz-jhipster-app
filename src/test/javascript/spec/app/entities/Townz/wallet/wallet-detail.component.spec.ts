import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { WalletDetailComponent } from 'app/entities/Townz/wallet/wallet-detail.component';
import { Wallet } from 'app/shared/model/Townz/wallet.model';

describe('Component Tests', () => {
  describe('Wallet Management Detail Component', () => {
    let comp: WalletDetailComponent;
    let fixture: ComponentFixture<WalletDetailComponent>;
    const route = ({ data: of({ wallet: new Wallet(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [WalletDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WalletDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WalletDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load wallet on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wallet).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
