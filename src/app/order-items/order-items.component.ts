import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RentPlan } from '../model/rent-plan';

@Component({
    selector: 'app-order-items',
    imports: [CurrencyPipe, DatePipe],
    templateUrl: './order-items.component.html',
    styleUrl: './order-items.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItems {
    readonly rentPlan = input.required<RentPlan>();
    readonly vehicleName = input.required<string>();
    readonly vehicleImage = input<string | null>(null);
    readonly cancel = output<void>();
}
