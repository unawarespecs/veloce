import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItems } from './order-items.component';
import { RentPlan } from '../model/rent-plan';

describe('OrderItems', () => {
    let component: OrderItems;
    let fixture: ComponentFixture<OrderItems>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderItems],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderItems);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('rentPlan', {
            id: 1,
            renterID: 2,
            vehicleID: 3,
            startRent: '2026-10-01',
            endRent: '2026-10-04',
            daysRent: 3,
            totalPrice: 7500,
            customerName: 'John Doe',
            payMode: 'GCash',
            status: 'Rented'
        } satisfies RentPlan);
        fixture.componentRef.setInput('vehicleName', 'Veloce Sedan');
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
