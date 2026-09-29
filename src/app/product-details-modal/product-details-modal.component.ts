import {
    Component,
    ChangeDetectionStrategy,
    computed,
    input,
    output,
    inject,
    signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../model/vehicle';
import { CartService } from '../service/cart.service';
import { VehicleService } from '../service/vehicle.service';
import { ArrowRight } from '../icon/arrow-right.component';

@Component({
    selector: 'app-product-details-modal',
    imports: [DecimalPipe, ArrowRight],
    templateUrl: './product-details-modal.component.html',
    styleUrl: './product-details-modal.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsModal {
    readonly vehicle = input<Vehicle | null>(null);
    readonly close = output<void>();
    readonly reserve = output<Vehicle>();

    private readonly cartService = inject(CartService);
    private readonly productService = inject(VehicleService);
    private readonly route = inject(ActivatedRoute, { optional: true });
    private readonly router = inject(Router, { optional: true });

    readonly routeVehicleId = signal<number | null>(null);

    constructor() {
        if (this.route) {
            this.route.queryParams.subscribe((params) => {
                if (params['id']) {
                    const id = Number(params['id']);
                    if (!isNaN(id)) {
                        this.routeVehicleId.set(id);
                    }
                }
            });
        }
    }

    readonly displayVehicle = computed<Vehicle | null>(() => {
        if (this.vehicle()) {
            return this.vehicle();
        }
        if (this.productService.selectedVehicle()) {
            return this.productService.selectedVehicle();
        }
        const routeId = this.routeVehicleId();
        if (routeId !== null) {
            const found = this.productService.getVehicleById(routeId);
            if (found) return found;
        }
        const fleet = this.productService.getFleet();
        return fleet.length > 0 ? fleet[0] : null;
    });

    readonly vehicleDescription = computed(() => {
        const v = this.displayVehicle();
        if (!v) return '';
        if (v.description) return v.description;
        return `A premium ${v.category.toLowerCase()} offering comfortable seating for ${v.seats} passengers, equipped with a ${v.transmission.toLowerCase()} transmission and fuel-efficient ${v.fuel.toLowerCase()} engine.`;
    });

    onReserve(vehicle: Vehicle): void {
        this.cartService.add(vehicle);
        this.reserve.emit(vehicle);
    }

    onClose(): void {
        this.productService.setSelectedVehicle(null);
        this.close.emit();
    }

    onBackdropClick(event: MouseEvent): void {
        if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
            this.onClose();
        }
    }
}
