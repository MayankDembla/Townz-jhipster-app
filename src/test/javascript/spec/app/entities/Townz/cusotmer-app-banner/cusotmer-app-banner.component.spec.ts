import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../../test.module';
import { CusotmerAppBannerComponent } from 'app/entities/Townz/cusotmer-app-banner/cusotmer-app-banner.component';
import { CusotmerAppBannerService } from 'app/entities/Townz/cusotmer-app-banner/cusotmer-app-banner.service';
import { CusotmerAppBanner } from 'app/shared/model/Townz/cusotmer-app-banner.model';

describe('Component Tests', () => {
  describe('CusotmerAppBanner Management Component', () => {
    let comp: CusotmerAppBannerComponent;
    let fixture: ComponentFixture<CusotmerAppBannerComponent>;
    let service: CusotmerAppBannerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CusotmerAppBannerComponent],
      })
        .overrideTemplate(CusotmerAppBannerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CusotmerAppBannerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CusotmerAppBannerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CusotmerAppBanner(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cusotmerAppBanners && comp.cusotmerAppBanners[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
