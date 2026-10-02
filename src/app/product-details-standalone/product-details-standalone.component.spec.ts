import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';

import { ProductDetailsStandalone } from './product-details-standalone.component';
import { VehicleService } from '../service/vehicle.service';
import { Vehicle } from '../model/vehicle';

describe('ProductDetailsStandalone', () => {
    let component: ProductDetailsStandalone;
    let fixture: ComponentFixture<ProductDetailsStandalone>;

    const testVehicle: Vehicle = {
        id: 1,
        name: 'Porsche 911 GT3',
        category: 'Sports',
        price: 15000,
        dailyRate: 15000,
        seats: 2,
        transmission: 'Automatic',
        fuel: 'Gasoline',
        imagePath: '/images/porsche.jpg',
        description: 'Exotic sports car experience.',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductDetailsStandalone],
            providers: [
                provideRouter([]),
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: VehicleService,
                    useValue: {
                        fleet: signal([testVehicle]),
                        fleetStatus: signal('loaded'),
                        selectedVehicle: signal(null),
                        getVehicleById: (id: number) => id === 1 ? testVehicle : undefined,
                        getFleet: () => [testVehicle],
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductDetailsStandalone);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should compute displayVehicle from provided vehicle input', () => {
        fixture.componentRef.setInput('vehicle', testVehicle);
        fixture.detectChanges();
        expect(component.displayVehicle()).toEqual(testVehicle);
    });
});
