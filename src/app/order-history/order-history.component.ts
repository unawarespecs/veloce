import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RentPlan } from '../model/rent-plan';

export interface OrderHistoryItem {
    plan: RentPlan;
    vehicleName: string;
    vehicleImage: string | null;
}

@Component({
    selector: 'app-order-history',
    imports: [CurrencyPipe, DatePipe],
    templateUrl: './order-history.component.html',
    styleUrl: './order-history.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
})
export class OrderHistory {
    readonly history = input<OrderHistoryItem[]>([]);
    readonly isLoading = input<boolean>(false);
}
