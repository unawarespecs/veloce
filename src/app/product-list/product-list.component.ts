import { Component, computed, signal, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ArrowRight } from '../icon/arrow-right.component';
import { CartService } from '../service/cart.service';
import { VehicleService } from '../service/vehicle.service';
import { Vehicle } from '../model/vehicle';
import { ProductDetails } from '../product-details/product-details.component';

@Component({
    selector: 'app-product-list',
    imports: [ArrowRight, DecimalPipe, ProductDetails],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
})
export class ProductList {
    readonly categories = [
        'All',
        'Sedan',
        'SUV',
        'Truck',
        'Van',
    ];
    readonly activeCategory = signal('All');
    readonly hoveredId = signal<number | null>(null);
    readonly selectedVehicle = signal<Vehicle | null>(null);

    private readonly productService = inject(VehicleService);
    private readonly cart = inject(CartService);

    readonly fleet = this.productService.fleet;
    readonly fleetStatus = this.productService.fleetStatus;

    readonly filteredFleet = computed(() =>
        this.activeCategory() === 'All'
            ? this.fleet()
            : this.fleet().filter((vehicle) => vehicle.category === this.activeCategory()),
    );

    selectCategory(category: string): void {
        this.activeCategory.set(category);
    }

    openDetails(vehicle: Vehicle): void {
        this.selectedVehicle.set(vehicle);
    }

    closeDetails(): void {
        this.selectedVehicle.set(null);
    }

    reserve(vehicle: Vehicle, event?: Event): void {
        if (event) {
            event.stopPropagation();
        }
        this.cart.add(vehicle);
    }
}
