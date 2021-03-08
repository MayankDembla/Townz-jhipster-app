import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyAppTestModule } from '../../../../test.module';
import { CusotmerNotificationDetailComponent } from 'app/entities/Townz/cusotmer-notification/cusotmer-notification-detail.component';
import { CusotmerNotification } from 'app/shared/model/Townz/cusotmer-notification.model';

describe('Component Tests', () => {
  describe('CusotmerNotification Management Detail Component', () => {
    let comp: CusotmerNotificationDetailComponent;
    let fixture: ComponentFixture<CusotmerNotificationDetailComponent>;
    const route = ({ data: of({ cusotmerNotification: new CusotmerNotification(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyAppTestModule],
        declarations: [CusotmerNotificationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CusotmerNotificationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CusotmerNotificationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cusotmerNotification on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cusotmerNotification).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
