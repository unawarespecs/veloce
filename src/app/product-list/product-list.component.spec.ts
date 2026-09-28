import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { ProductList } from './product-list.component';
import { Vehicle } from '../model/vehicle';
import { VehicleService } from '../service/vehicle.service';

describe('ProductList', () => {
    let component: ProductList;
    let fixture: ComponentFixture<ProductList>;
    const vehicles: Vehicle[] = Array.from({ length: 11 }, (_, index) => ({
        id: index + 1,
        name: `Vehicle ${index + 1}`,
        category: 'Sedan',
        price: 1000,
        dailyRate: 1000,
        seats: 5,
        transmission: 'Automatic',
        fuel: 'Gasoline',
        imagePath: '',
    }));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductList],
            providers: [{
                provide: VehicleService,
                useValue: {
                    fleet: signal(vehicles),
                    fleetStatus: signal('loaded'),
                },
            }],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display all vehicles when no maximum is provided', () => {
        expect(component.displayedFleet()).toHaveLength(11);
    });

    it('should limit the displayed vehicles to the configured maximum', () => {
        fixture.componentRef.setInput('maxVehicles', 9);
        fixture.detectChanges();

        expect(component.displayedFleet()).toHaveLength(9);
        expect(fixture.nativeElement.querySelectorAll('.vehicle')).toHaveLength(9);
    });
});
