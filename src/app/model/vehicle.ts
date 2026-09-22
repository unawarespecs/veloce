export interface Vehicle {
    id: number;
    name: string;
    category: string;
    price: number;
    dailyRate: number;
    seats: number;
    transmission: string;
    fuel: string;
    imagePath: string;
    tag?: string | null;
    description?: string | null;
}
