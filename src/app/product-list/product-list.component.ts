import { Component, computed, input, signal, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ArrowRight } from '../icon/arrow-right.component';
import { CartService } from '../service/cart.service';
import { VehicleService } from '../service/vehicle.service';
import { Vehicle } from '../model/vehicle';
import { ProductDetailsModal } from '../product-details-modal/product-details-modal.component';

@Component({
    selector: 'app-product-list',
    imports: [ArrowRight, DecimalPipe, ProductDetailsModal],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
})
export class ProductList {
    readonly maxVehicles = input<number>();
    readonly detailsMode = input<'modal' | 'standalone'>('modal');
    readonly categories = ['All', 'Sedan', 'SUV', 'Truck', 'Van', 'Sports', 'Luxury'];
    readonly activeCategory = signal('All');
    readonly hoveredId = signal<number | null>(null);
    readonly selectedVehicle = signal<Vehicle | null>(null);

    private readonly productService = inject(VehicleService);
    private readonly cart = inject(CartService);
    private readonly router = inject(Router, { optional: true });

    readonly fleet = this.productService.fleet;
    readonly fleetStatus = this.productService.fleetStatus;

    readonly filteredFleet = computed(() =>
        this.activeCategory() === 'All'
            ? this.fleet()
            : this.fleet().filter((vehicle) => vehicle.category === this.activeCategory()),
    );
    readonly displayedFleet = computed(() => this.filteredFleet().slice(0, this.maxVehicles()));

    selectCategory(category: string): void {
        this.activeCategory.set(category);
    }

    openDetails(vehicle: Vehicle): void {
        if (this.detailsMode() === 'standalone') {
            if (this.router) {
                this.router.navigate(['/fleet', vehicle.id]);
            }
        } else {
            this.selectedVehicle.set(vehicle);
        }
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
