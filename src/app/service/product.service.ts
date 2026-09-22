import { Injectable, signal } from '@angular/core';
import { Vehicle } from '../model/product';

export { Product } from '../model/product';

export const FLEET: Vehicle[] = [
    {
        id: 1,
        name: 'Toyota Corolla',
        category: 'Sedan',
        price: 6600,
        seats: 4,
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: 'img/toyota-corolla.png',
        tag: 'Most Booked',
        description: 'Reliable and fuel-efficient sedan, perfect for city drives and everyday Metro Manila travel.',
    },
    {
        id: 2,
        name: 'Mitsubishi Montero Sport',
        category: 'SUV',
        price: 7500,
        seats: 8,
        transmission: 'Automatic',
        fuel: 'Diesel',
        image: 'img/mitsubishi-montero-sport.jpg',
        tag: null,
        description: 'Spacious 8-seater SUV built for family trips with high ground clearance and smooth handling.',
    },
    {
        id: 3,
        name: 'Isuzu MU-X',
        category: 'SUV',
        price: 7750,
        seats: 6,
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: 'img/mux-image-01.webp',
        tag: null,
        description: 'Versatile SUV with rugged capability, commanding road presence, and ample passenger room.',
    },
    {
        id: 4,
        name: 'Tesla Model 3',
        category: 'Sedan',
        price: 7250,
        seats: 5,
        transmission: 'Automatic',
        fuel: 'Electric',
        image: 'img/tesla-model-3.jpg',
        tag: null,
        description: 'All-electric performance sedan with premium minimalist cabin, instant power, and smooth range.',
    },
    {
        id: 5,
        name: 'Toyota Fortuner',
        category: 'SUV',
        price: 9500,
        seats: 7,
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: 'img/toyota-fortuner.jpg',
        tag: 'Limited',
        description: 'Iconic 7-seater SUV offering high luxury, strong performance, and supreme comfort across all roads.',
    },
    {
        id: 7,
        name: 'Ford Ranger Raptor',
        category: 'Truck',
        price: 4200,
        seats: 5,
        transmission: 'Automatic',
        fuel: 'Diesel',
        image: 'https://images.unsplash.com/photo-1714496438846-2e27f541ca95?w=800&h=520&fit=crop&auto=format',
        tag: 'Most Booked',
        description: 'High-octane off-road performance pickup designed to master rugged terrains with style.',
    },
    {
        id: 8,
        name: 'Toyota Hilux 4x4',
        category: 'Truck',
        price: 3500,
        seats: 5,
        transmission: 'Manual',
        fuel: 'Diesel',
        image: 'https://images.unsplash.com/photo-1697265169823-0a82a2e57406?w=800&h=520&fit=crop&auto=format',
        tag: null,
        description: 'Dependable 4x4 truck with maximum utility, robust manual transmission, and proven durability.',
    },
    {
        id: 9,
        name: 'Toyota HiAce GL',
        category: 'Van',
        price: 3800,
        seats: 12,
        transmission: 'Automatic',
        fuel: 'Diesel',
        image: 'https://images.unsplash.com/photo-1598287059762-2d06559cf65a?w=800&h=520&fit=crop&auto=format',
        tag: null,
        description: 'Extra-spacious 12-passenger van tailored for corporate teams, family reunions, and group excursions.',
    },
    {
        id: 10,
        name: 'Hyundai Starex Premium',
        category: 'Van',
        price: 3200,
        seats: 9,
        transmission: 'Automatic',
        fuel: 'Diesel',
        image: 'https://images.unsplash.com/photo-1768271110749-4a304176a4de?w=800&h=520&fit=crop&auto=format',
        tag: 'Great Value',
        description: 'Premium executive 9-seater passenger van delivering plush seating and comfortable long-distance travel.',
    },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly selectedVehicleSignal = signal<Vehicle | null>(null);
  readonly selectedVehicle = this.selectedVehicleSignal.asReadonly();

  getFleet(): Vehicle[] {
    return FLEET;
  }

  getVehicleById(id: number): Vehicle | undefined {
    return FLEET.find((v) => v.id === id);
  }

  setSelectedVehicle(vehicle: Vehicle | null): void {
    this.selectedVehicleSignal.set(vehicle);
  }
}
