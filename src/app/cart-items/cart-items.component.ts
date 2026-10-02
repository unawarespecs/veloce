import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { RentPlanService } from '../service/rent-plan.service';
import { RenterService } from '../service/renter.service';
import { ModeOfPayment } from '../model/mode-of-payment';
import { RentPlan } from '../model/rent-plan';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cart-items',
    imports: [DecimalPipe, FormsModule, RouterLink],
    templateUrl: './cart-items.component.html',
    styleUrl: './cart-items.component.css',
})
export class CartItems {
    readonly cart = inject(CartService);
    private readonly rentPlanService = inject(RentPlanService);
    private readonly renterService = inject(RenterService);

    readonly paymentModes = Object.values(ModeOfPayment);
    readonly isSubmitting = signal(false);
    readonly successMessage = signal<string | null>(null);
    readonly errorMessage = signal<string | null>(null);

    remove(vehicleId: number): void {
        this.cart.remove(vehicleId);
        this.successMessage.set(null);
        this.errorMessage.set(null);
    }

    clear(): void {
        this.cart.clear();
        this.successMessage.set(null);
        this.errorMessage.set(null);
    }

    onStartDateChange(date: string): void {
        this.cart.setStartDate(date);
    }

    onEndDateChange(date: string): void {
        this.cart.setEndDate(date);
    }

    onPayModeChange(mode: ModeOfPayment): void {
        this.cart.setPayMode(mode);
    }

    confirmRental(): void {
        const item = this.cart.items()[0];
        if (!item) {
            this.errorMessage.set('No vehicle in cart.');
            return;
        }

        const currentRenter = this.renterService.currentRenter();
        const renterName = currentRenter ? currentRenter.name : 'Guest Renter';

        const rentPlan: RentPlan = {
            renterID: currentRenter ? currentRenter.id : undefined,
            vehicleID: item.id,
            startRent: this.cart.startDate(),
            endRent: this.cart.endDate(),
            daysRent: this.cart.daysRent(),
            totalPrice: this.cart.total(),
            customerName: renterName,
            payMode: this.cart.payMode(),
            status: 'Pending'
        };

        this.isSubmitting.set(true);
        this.errorMessage.set(null);
        this.successMessage.set(null);

        this.rentPlanService.createRentPlan(rentPlan).subscribe({
            next: (createdPlan) => {
                if (currentRenter) {
                    this.renterService
                        .updateRenter({
                            id: currentRenter.id,
                            rentPlanID: String(createdPlan.id ?? ''),
                            rentedVehicleID: String(item.id),
                            vehicleName: item.name,
                        })
                        .subscribe({
                            next: () => {
                                this.isSubmitting.set(false);
                                this.successMessage.set(
                                    `Vehicle successfully reserved! Rent Plan ID: #${createdPlan.id}`
                                );
                                this.cart.clear();
                            },
                            error: (err) => {
                                console.error('Failed to update renter profile', err);
                                this.isSubmitting.set(false);
                                this.successMessage.set(
                                    `Vehicle successfully reserved! Rent Plan ID: #${createdPlan.id}`
                                );
                                this.cart.clear();
                            },
                        });
                } else {
                    this.isSubmitting.set(false);
                    this.successMessage.set(
                        `Vehicle successfully reserved! Rent Plan ID: #${createdPlan.id}`
                    );
                    this.cart.clear();
                }
            },
            error: (err) => {
                console.error('Failed to create rent plan', err);
                this.isSubmitting.set(false);
                this.errorMessage.set('Failed to create reservation plan. Please try again.');
            },
        });
    }
}
