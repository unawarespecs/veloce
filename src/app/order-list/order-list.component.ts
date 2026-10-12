import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { OrderItems } from '../order-items/order-items.component';
import { OrderHistory, OrderHistoryItem } from '../order-history/order-history.component';
import { RentPlan } from '../model/rent-plan';
import { RentPlanStatus } from '../model/rent-plan-status';
import { RentPlanService } from '../service/rent-plan.service';
import { RenterService } from '../service/renter.service';
import { VehicleService } from '../service/vehicle.service';
import { Header } from '../header/header.component';
import { Footer } from '../footer/footer.component';

@Component({
    selector: 'app-order-list',
    imports: [OrderItems, OrderHistory, Header, Footer],
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
    readonly historyPlans = signal<RentPlan[]>([]);
    readonly isLoading = signal(false);
    readonly isLoadingHistory = signal(false);
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

    readonly historyOrders = computed<OrderHistoryItem[]>(() => {
        const renter = this.currentRenter();
        if (!renter) {
            return [];
        }

        const vehicleNames = new Map(
            this.vehicleService.fleet().map((vehicle) => [vehicle.id, vehicle.name]),
        );

        return this.historyPlans()
            .filter(
                (plan) =>
                    plan.renterID === renter.id ||
                    plan.customerName === renter.name,
            )
            .map((plan) => ({
                plan,
                vehicleName: vehicleNames.get(plan.vehicleID) ?? `Vehicle #${plan.vehicleID}`,
                vehicleImage: this.vehicleService.getVehicleById(plan.vehicleID)?.imagePath ?? null,
            }));
    });

    constructor() {
        this.loadOrders();
        this.loadHistory();
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

        const historyPlan: RentPlan = {
            ...plan,
            status: RentPlanStatus.Cancelled,
        };

        this.rentPlanService.addPlanToHistory(historyPlan).subscribe({
            next: () => {
                this.rentPlanService.deleteRentPlan(plan.id!).subscribe({
                    next: () => {
                        const renter = this.currentRenter();
                        if (!renter) {
                            this.rentPlans.update((plans) => plans.filter((item) => item.id !== plan.id));
                            this.cancellingId.set(null);
                            this.successMessage.set('Reservation cancelled successfully.');
                            this.loadHistory();
                            return;
                        }

                        this.renterService.clearRentalDetails(renter.id).subscribe({
                            next: () => {
                                this.rentPlans.update((plans) => plans.filter((item) => item.id !== plan.id));
                                this.cancellingId.set(null);
                                this.successMessage.set('Reservation cancelled successfully.');
                                this.loadHistory();
                            },
                            error: (error: unknown) => {
                                console.error('Failed to clear renter rental details', error);
                                this.rentPlans.update((plans) => plans.filter((item) => item.id !== plan.id));
                                this.cancellingId.set(null);
                                this.errorMessage.set(
                                    'Reservation cancelled, but your renter rental details could not be cleared.'
                                );
                                this.loadHistory();
                            },
                        });
                    },
                    error: (error: unknown) => {
                        console.error('Failed to delete rent plan', error);
                        this.cancellingId.set(null);
                        this.errorMessage.set('Unable to delete reservation plan. Please try again.');
                    },
                });
            },
            error: (error: unknown) => {
                console.error('Failed to add reservation to history', error);
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

    private loadHistory(): void {
        const renter = this.currentRenter();
        if (!renter) {
            return;
        }

        this.isLoadingHistory.set(true);
        this.rentPlanService.getRentPlanHistory(renter.id).subscribe({
            next: (history) => {
                this.historyPlans.set(history);
                this.isLoadingHistory.set(false);
            },
            error: (error: unknown) => {
                console.error('Failed to load rental history', error);
                this.isLoadingHistory.set(false);
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
