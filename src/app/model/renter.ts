export interface Renter {
    id: number;
    name: string;
    email: string;
    password: string;
    rentPlanID: number | string | null;
    rentedVehicleID: number | string | null;
    vehicleName: string | null;
}
