import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { RentPlanService } from './rent-plan.service';
import { RentPlan } from '../model/rent-plan';

describe('RentPlanService', () => {
    let service: RentPlanService;
    let httpTesting: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(RentPlanService);
        httpTesting = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTesting.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should POST /api/rentplan/ when createRentPlan is called', () => {
        const mockPlan: RentPlan = {
            vehicleID: 1,
            startRent: '2026-10-01',
            endRent: '2026-10-04',
            daysRent: 3,
            totalPrice: 7500,
            customerName: 'John Doe',
            payMode: 'GCash',
        };

        service.createRentPlan(mockPlan).subscribe((res) => {
            expect(res.id).toBe(100);
        });

        const req = httpTesting.expectOne('http://localhost:8080/api/rentplan/');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockPlan);
        req.flush({ ...mockPlan, id: 100 });
    });

    it('should DELETE /api/rentplan/:id when deleteRentPlan is called', () => {
        service.deleteRentPlan(100).subscribe();

        const req = httpTesting.expectOne('http://localhost:8080/api/rentplan/100');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });

    it('should POST /api/rentplan/history when addPlanToHistory is called', () => {
        const mockPlan: RentPlan = {
            id: 10,
            vehicleID: 2,
            startRent: '2026-10-01',
            endRent: '2026-10-04',
            daysRent: 3,
            totalPrice: 13050,
            customerName: 'John Doe',
            payMode: 'Cash',
            status: 'Cancelled',
        };

        service.addPlanToHistory(mockPlan).subscribe((res) => {
            expect(res.status).toBe('Cancelled');
        });

        const req = httpTesting.expectOne('http://localhost:8080/api/rentplan/history');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockPlan);
        req.flush(mockPlan);
    });

    it('should GET /api/rentplan/history?renterId=1 when getRentPlanHistory is called with renterId', () => {
        service.getRentPlanHistory(1).subscribe((res) => {
            expect(res.length).toBe(1);
        });

        const req = httpTesting.expectOne('http://localhost:8080/api/rentplan/history?renterId=1');
        expect(req.request.method).toBe('GET');
        req.flush([{ id: 10, vehicleID: 2, customerName: 'John Doe' }]);
    });
});
