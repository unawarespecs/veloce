import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { OrderList } from './order-list.component';
import { RentPlanService } from '../service/rent-plan.service';
import { RenterService } from '../service/renter.service';
import { RentPlan } from '../model/rent-plan';
import { RentPlanStatus } from '../model/rent-plan-status';

describe('OrderList', () => {
    let component: OrderList;
    let fixture: ComponentFixture<OrderList>;
    let rentPlanService: RentPlanService;
    let renterService: RenterService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderList],
            providers: [provideRouter([]), provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderList);
        component = fixture.componentInstance;
        rentPlanService = TestBed.inject(RentPlanService);
        renterService = TestBed.inject(RenterService);
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add plan to history with Cancelled status before deleting when cancelling', () => {
        const mockPlan: RentPlan = {
            id: 15,
            renterID: 1,
            vehicleID: 2,
            startRent: '2026-10-01',
            endRent: '2026-10-04',
            daysRent: 3,
            totalPrice: 13050,
            customerName: 'John Doe',
            payMode: 'Cash',
            status: RentPlanStatus.Pending,
        };

        vi.spyOn(window, 'confirm').mockReturnValue(true);
        const addHistorySpy = vi.spyOn(rentPlanService, 'addPlanToHistory').mockReturnValue(of({ ...mockPlan, status: RentPlanStatus.Cancelled }));
        const deleteSpy = vi.spyOn(rentPlanService, 'deleteRentPlan').mockReturnValue(of(void 0));
        vi.spyOn(renterService, 'clearRentalDetails').mockReturnValue(of({} as any));

        component.cancel(mockPlan);

        expect(addHistorySpy).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 15,
                status: RentPlanStatus.Cancelled,
            }),
        );
        expect(deleteSpy).toHaveBeenCalledWith(15);
    });
});
