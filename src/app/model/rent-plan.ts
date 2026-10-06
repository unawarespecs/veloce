import { RentPlanStatus } from './rent-plan-status';
import { ModeOfPayment } from './mode-of-payment';

export interface RentPlan {
    id?: number;
    renterID?: number;
    vehicleID: number;
    startRent: Date | string;
    endRent: Date | string;
    daysRent: number;
    totalPrice: number;
    customerName: string;
    payMode: string | ModeOfPayment;
    status?: string | RentPlanStatus;
}
