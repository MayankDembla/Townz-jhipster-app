import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { CusotmerAppBannerDetailComponent } from 'app/entities/Townz/cusotmer-app-banner/cusotmer-app-banner-detail.component';
import { CusotmerAppBanner } from 'app/shared/model/Townz/cusotmer-app-banner.model';

describe('Component Tests', () => {
  describe('CusotmerAppBanner Management Detail Component', () => {
    let comp: CusotmerAppBannerDetailComponent;
    let fixture: ComponentFixture<CusotmerAppBannerDetailComponent>;
    const route = ({ data: of({ cusotmerAppBanner: new CusotmerAppBanner(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CusotmerAppBannerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CusotmerAppBannerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CusotmerAppBannerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cusotmerAppBanner on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cusotmerAppBanner).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
