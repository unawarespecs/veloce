import { Injectable, computed, signal, WritableSignal } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { ModeOfPayment } from '../model/mode-of-payment';
import { RentPlanStatus } from '../model/rent-plan-status';

@Injectable({ providedIn: 'root' })
export class CartService {
    private readonly cartItems = signal<Vehicle[]>([]);
    readonly items = this.cartItems.asReadonly();
    readonly count = computed(() => this.cartItems().length);

    private readonly today = new Date().toISOString().split('T')[0];
    private readonly tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    readonly startDate = signal<string>(this.today);
    readonly endDate = signal<string>(this.tomorrow);
    readonly payMode = signal<ModeOfPayment>(ModeOfPayment.Cash);
    readonly orderStatus= signal<RentPlanStatus>(RentPlanStatus.Pending);

    readonly daysRent = computed(() => {
        const start = new Date(this.startDate());
        const end = new Date(this.endDate());
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return 1;
        }
        const diffMs = end.getTime() - start.getTime();
        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 1;
    });

    readonly total = computed(() => {
        const item = this.cartItems()[0];
        if (!item) return 0;
        const rate = item.dailyRate ?? item.price;
        return rate * this.daysRent();
    });

    add(vehicle: Vehicle): void {
        // Enforce maximum of 1 vehicle in cart
        this.cartItems.set([vehicle]);
    }

    remove(vehicleId: number): void {
        this.cartItems.update((items) => items.filter((item) => item.id !== vehicleId));
    }

    clear(): void {
        this.cartItems.set([]);
    }

    setStartDate(date: string): void {
        this.startDate.set(date);
    }

    setEndDate(date: string): void {
        this.endDate.set(date);
    }

    setPayMode(mode: ModeOfPayment): void {
        this.payMode.set(mode);
    }

    setStatus(status: RentPlanStatus): void {
        this.orderStatus.set(status);
    }
}
