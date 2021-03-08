import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { CusotmerAppBannerUpdateComponent } from 'app/entities/Townz/cusotmer-app-banner/cusotmer-app-banner-update.component';
import { CusotmerAppBannerService } from 'app/entities/Townz/cusotmer-app-banner/cusotmer-app-banner.service';
import { CusotmerAppBanner } from 'app/shared/model/Townz/cusotmer-app-banner.model';

describe('Component Tests', () => {
  describe('CusotmerAppBanner Management Update Component', () => {
    let comp: CusotmerAppBannerUpdateComponent;
    let fixture: ComponentFixture<CusotmerAppBannerUpdateComponent>;
    let service: CusotmerAppBannerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CusotmerAppBannerUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CusotmerAppBannerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CusotmerAppBannerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CusotmerAppBannerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CusotmerAppBanner(123);
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
        const entity = new CusotmerAppBanner();
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
