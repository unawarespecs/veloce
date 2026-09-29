export interface RentPlan {
    id?: number;
    renterID?: number;
    vehicleID: number;
    startRent: Date | string;
    endRent: Date | string;
    daysRent: number;
    totalPrice: number;
    customerName: string;
    payMode: string;
    status?: string;
}
