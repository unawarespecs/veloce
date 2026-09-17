import { Injectable } from '@angular/core';

export interface Vehicle {
    id: number;
    name: string;
    category: string;
    price: number;
    seats: number;
    transmission: string;
    fuel: string;
    image: string;
    tag: string | null;
}

@Injectable({ providedIn: 'root' })
export class Product {
    id = 0;
    imagePath = '';
    title = '';
}
