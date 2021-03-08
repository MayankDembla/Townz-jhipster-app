import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CusotmerAppBannerService } from 'app/entities/Townz/cusotmer-app-banner/cusotmer-app-banner.service';
import { ICusotmerAppBanner, CusotmerAppBanner } from 'app/shared/model/Townz/cusotmer-app-banner.model';

describe('Service Tests', () => {
  describe('CusotmerAppBanner Service', () => {
    let injector: TestBed;
    let service: CusotmerAppBannerService;
    let httpMock: HttpTestingController;
    let elemDefault: ICusotmerAppBanner;
    let expectedResult: ICusotmerAppBanner | ICusotmerAppBanner[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CusotmerAppBannerService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new CusotmerAppBanner(0, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CusotmerAppBanner', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CusotmerAppBanner()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CusotmerAppBanner', () => {
        const returnedFromService = Object.assign(
          {
            image: 'BBBBBB',
            location: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CusotmerAppBanner', () => {
        const returnedFromService = Object.assign(
          {
            image: 'BBBBBB',
            location: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CusotmerAppBanner', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
