import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ArrowRight } from '../icon/arrow-right.component';
import { CartService } from '../service/cart.service';
import { Vehicle } from '../model/product';

const FLEET: Vehicle[] = [
  {
    id: 1,
    name: 'Toyota Corolla',
    category: 'Sedan',
    price: 6600,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Petrol',
    image:
      'img/toyota-corolla.png',
    tag: 'Most Booked',
  },
  {
    id: 2,
    name: 'Mitsubishi Montero Sport',
    category: 'SUV',
    price: 7500,
    seats: 8,
    transmission: 'Automatic',
    fuel: 'Diesel',
    image:
      'img/mitsubishi-montero-sport.jpg',
    tag: null,
  },
  {
    id: 3,
    name: 'Isuzu D-MAX',
    category: 'SUV',
    price: 7750,
    seats: 6,
    transmission: 'Automatic',
    fuel: 'Petrol',
    image:
      'img/isuzu-dmax.jpg',
    tag: null,
  },
  {
    id: 4,
    name: 'Tesla Model 3',
    category: 'Sedan',
    price: 7250,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    image:
      'img/tesla-model-3.jpg',
    tag: null,
  },
  {
    id: 5,
    name: 'Toyota Fortuner',
    category: 'SUV',
    price: 9500,
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Petrol',
    image:
      'img/toyota-fortuner.jpg',
    tag: 'Limited',
  },
  {
    id: 7,
    name: 'Ford Ranger Raptor',
    category: 'Truck',
    price: 4200,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Diesel',
    image:
      'https://images.unsplash.com/photo-1714496438846-2e27f541ca95?w=800&h=520&fit=crop&auto=format',
    tag: 'Most Booked',
  },
  {
    id: 8,
    name: 'Toyota Hilux 4x4',
    category: 'Truck',
    price: 3500,
    seats: 5,
    transmission: 'Manual',
    fuel: 'Diesel',
    image:
      'https://images.unsplash.com/photo-1697265169823-0a82a2e57406?w=800&h=520&fit=crop&auto=format',
    tag: null,
  },
  {
    id: 9,
    name: 'Toyota HiAce GL',
    category: 'Van',
    price: 3800,
    seats: 12,
    transmission: 'Automatic',
    fuel: 'Diesel',
    image:
      'https://images.unsplash.com/photo-1598287059762-2d06559cf65a?w=800&h=520&fit=crop&auto=format',
    tag: null,
  },
  {
    id: 10,
    name: 'Hyundai Starex Premium',
    category: 'Van',
    price: 3200,
    seats: 9,
    transmission: 'Automatic',
    fuel: 'Diesel',
    image:
      'https://images.unsplash.com/photo-1768271110749-4a304176a4de?w=800&h=520&fit=crop&auto=format',
    tag: 'Great Value',
  },
];

@Component({
  selector: 'app-product-list',
  imports: [ArrowRight, DecimalPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductList {
  readonly categories = [
    'All',
    'Sports',
    'Luxury Sedan',
    'SUV',
    'Truck',
    'Van',
    'Ultra Luxury',
    'Grand Tourer',
  ];
  readonly activeCategory = signal('All');
  readonly hoveredId = signal<number | null>(null);
  readonly filteredFleet = computed(() =>
    this.activeCategory() === 'All'
      ? FLEET
      : FLEET.filter((vehicle) => vehicle.category === this.activeCategory()),
  );
  constructor(private readonly cart: CartService) {}
  selectCategory(category: string): void {
    this.activeCategory.set(category);
  }
  reserve(vehicle: Vehicle): void {
    this.cart.add(vehicle);
  }
}
