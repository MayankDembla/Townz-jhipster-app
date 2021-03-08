import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MyAppTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { CusotmerAppBannerDeleteDialogComponent } from 'app/entities/Townz/cusotmer-app-banner/cusotmer-app-banner-delete-dialog.component';
import { CusotmerAppBannerService } from 'app/entities/Townz/cusotmer-app-banner/cusotmer-app-banner.service';

describe('Component Tests', () => {
  describe('CusotmerAppBanner Management Delete Component', () => {
    let comp: CusotmerAppBannerDeleteDialogComponent;
    let fixture: ComponentFixture<CusotmerAppBannerDeleteDialogComponent>;
    let service: CusotmerAppBannerService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CusotmerAppBannerDeleteDialogComponent],
      })
        .overrideTemplate(CusotmerAppBannerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CusotmerAppBannerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CusotmerAppBannerService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
