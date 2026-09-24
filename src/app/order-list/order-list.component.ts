import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { OrderItems } from '../order-items/order-items.component';
import { RentPlan } from '../model/rent-plan';
import { RentPlanService } from '../service/rent-plan.service';
import { RenterService } from '../service/renter.service';
import { VehicleService } from '../service/vehicle.service';

@Component({
    selector: 'app-order-list',
    imports: [OrderItems],
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderList {
    private readonly rentPlanService = inject(RentPlanService);
    private readonly renterService = inject(RenterService);
    private readonly vehicleService = inject(VehicleService);

    readonly currentRenter = this.renterService.currentRenter;
    readonly rentPlans = signal<RentPlan[]>([]);
    readonly isLoading = signal(false);
    readonly errorMessage = signal<string | null>(null);
    readonly successMessage = signal<string | null>(null);
    readonly cancellingId = signal<number | null>(null);

    readonly orders = computed(() => {
        const renter = this.currentRenter();
        if (!renter) {
            return [];
        }

        const vehicleIds = this.parseVehicleIds(renter.rentedVehicleID);
        const vehicleNames = new Map(
            this.vehicleService.fleet().map((vehicle) => [vehicle.id, vehicle.name]),
        );

        return this.rentPlans()
            .filter(
                (plan) =>
                    plan.renterID === renter.id &&
                    plan.customerName === renter.name &&
                    vehicleIds.includes(plan.vehicleID),
            )
            .map((plan) => ({
                plan,
                vehicleName: vehicleNames.get(plan.vehicleID) ?? `Vehicle #${plan.vehicleID}`,
                vehicleImage: this.vehicleService.getVehicleById(plan.vehicleID)?.imagePath ?? null,
            }));
    });

    constructor() {
        this.loadOrders();
    }

    cancel(plan: RentPlan): void {
        if (plan.id === undefined || this.cancellingId() !== null) {
            return;
        }
        if (!window.confirm('Are you sure you want to cancel this reservation?')) {
            return;
        }

        this.cancellingId.set(plan.id);
        this.errorMessage.set(null);
        this.successMessage.set(null);
        this.rentPlanService.deleteRentPlan(plan.id).subscribe({
            next: () => {
                const renter = this.currentRenter();
                if (!renter) {
                    this.rentPlans.update((plans) => plans.filter((item) => item.id !== plan.id));
                    this.cancellingId.set(null);
                    this.successMessage.set('Reservation cancelled successfully.');
                    return;
                }

                this.renterService.clearRentalDetails(renter.id).subscribe({
                    next: () => {
                        this.rentPlans.update((plans) => plans.filter((item) => item.id !== plan.id));
                        this.cancellingId.set(null);
                        this.successMessage.set('Reservation cancelled successfully.');
                    },
                    error: (error: unknown) => {
                        console.error('Failed to clear renter rental details', error);
                        this.rentPlans.update((plans) => plans.filter((item) => item.id !== plan.id));
                        this.cancellingId.set(null);
                        this.errorMessage.set(
                            'Reservation cancelled, but your renter rental details could not be cleared.'
                        );
                    },
                });
            },
            error: (error: unknown) => {
                console.error('Failed to cancel reservation', error);
                this.cancellingId.set(null);
                this.errorMessage.set('Unable to cancel this reservation. Please try again.');
            },
        });
    }

    private loadOrders(): void {
        if (!this.currentRenter()) {
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.rentPlanService.getRentPlans().subscribe({
            next: (plans) => {
                this.rentPlans.set(plans);
                this.isLoading.set(false);
            },
            error: (error: unknown) => {
                console.error('Failed to load reservations', error);
                this.isLoading.set(false);
                this.errorMessage.set('Unable to load your reservations. Please try again.');
            },
        });
    }

    private parseVehicleIds(value: number | string | null | undefined): number[] {
        if (typeof value === 'number') {
            return Number.isInteger(value) && value > 0 ? [value] : [];
        }

        return (value ?? '')
            .split(',')
            .map((id) => Number(id.trim()))
            .filter((id) => Number.isInteger(id) && id > 0);
    }
}
