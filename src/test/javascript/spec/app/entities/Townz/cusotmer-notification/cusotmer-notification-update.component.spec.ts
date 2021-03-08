import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { CusotmerNotificationUpdateComponent } from 'app/entities/Townz/cusotmer-notification/cusotmer-notification-update.component';
import { CusotmerNotificationService } from 'app/entities/Townz/cusotmer-notification/cusotmer-notification.service';
import { CusotmerNotification } from 'app/shared/model/Townz/cusotmer-notification.model';

describe('Component Tests', () => {
  describe('CusotmerNotification Management Update Component', () => {
    let comp: CusotmerNotificationUpdateComponent;
    let fixture: ComponentFixture<CusotmerNotificationUpdateComponent>;
    let service: CusotmerNotificationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CusotmerNotificationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CusotmerNotificationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CusotmerNotificationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CusotmerNotificationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CusotmerNotification(123);
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
        const entity = new CusotmerNotification();
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
