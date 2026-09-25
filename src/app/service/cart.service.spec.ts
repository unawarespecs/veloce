import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Vehicle } from '../model/vehicle';

describe('CartService', () => {
    let service: CartService;

    const vehicleA: Vehicle = {
        id: 1,
        name: 'Veloce Sedan',
        category: 'Sedan',
        price: 1500000,
        dailyRate: 2500,
        seats: 5,
        transmission: 'Automatic',
        fuel: 'Petrol',
        imagePath: '/images/sedan.jpg',
    };

    const vehicleB: Vehicle = {
        id: 2,
        name: 'Veloce SUV',
        category: 'SUV',
        price: 2500000,
        dailyRate: 4000,
        seats: 7,
        transmission: 'Automatic',
        fuel: 'Petrol',
        imagePath: '/images/suv.jpg',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CartService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should restrict cart to only one vehicle when adding multiple items', () => {
        service.add(vehicleA);
        expect(service.count()).toBe(1);
        expect(service.items()[0].id).toBe(1);

        service.add(vehicleB);
        expect(service.count()).toBe(1);
        expect(service.items()[0].id).toBe(2);
    });

    it('should calculate total price based on vehicle.dailyRate and daysRent', () => {
        service.add(vehicleA);
        service.setStartDate('2026-10-01');
        service.setEndDate('2026-10-04'); // 3 days

        expect(service.daysRent()).toBe(3);
        expect(service.total()).toBe(7500); // 2500 * 3
    });
});
