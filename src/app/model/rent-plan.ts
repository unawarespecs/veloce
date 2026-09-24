export interface RentPlan {
    id: number;
    vehicleID: number;
    startRent: Date;
    endRent: Date;
    daysRent: number;
    totalPrice: number;
    customerName: string;
    payMode: string;
}
