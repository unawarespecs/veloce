import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { ProductList } from './product-list.component';
import { Vehicle } from '../model/vehicle';
import { VehicleService } from '../service/vehicle.service';

describe('ProductList', () => {
    let component: ProductList;
    let fixture: ComponentFixture<ProductList>;
    let router: Router;

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
            providers: [
                provideRouter([]),
                {
                    provide: VehicleService,
                    useValue: {
                        fleet: signal(vehicles),
                        fleetStatus: signal('loaded'),
                    },
                },
            ],
        }).compileComponents();

        router = TestBed.inject(Router);
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

    it('should open details in modal by default when vehicle clicked', () => {
        expect(component.detailsMode()).toBe('modal');
        component.openDetails(vehicles[0]);
        expect(component.selectedVehicle()).toEqual(vehicles[0]);
    });

    it('should navigate to route when detailsMode is standalone', () => {
        fixture.componentRef.setInput('detailsMode', 'standalone');
        fixture.detectChanges();

        const navigateSpy = vi.spyOn(router, 'navigate');
        component.openDetails(vehicles[0]);

        expect(navigateSpy).toHaveBeenCalledWith(['/fleet', vehicles[0].id]);
        expect(component.selectedVehicle()).toBeNull();
    });
});
