import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../../test.module';
import { CusotmerNotificationComponent } from 'app/entities/Townz/cusotmer-notification/cusotmer-notification.component';
import { CusotmerNotificationService } from 'app/entities/Townz/cusotmer-notification/cusotmer-notification.service';
import { CusotmerNotification } from 'app/shared/model/Townz/cusotmer-notification.model';

describe('Component Tests', () => {
  describe('CusotmerNotification Management Component', () => {
    let comp: CusotmerNotificationComponent;
    let fixture: ComponentFixture<CusotmerNotificationComponent>;
    let service: CusotmerNotificationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CusotmerNotificationComponent],
      })
        .overrideTemplate(CusotmerNotificationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CusotmerNotificationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CusotmerNotificationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CusotmerNotification(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cusotmerNotifications && comp.cusotmerNotifications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
