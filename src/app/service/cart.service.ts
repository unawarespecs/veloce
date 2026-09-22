import { Injectable, computed, signal } from '@angular/core';
import { Vehicle } from '../model/vehicle';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartItems = signal<Vehicle[]>([]);
  readonly items = this.cartItems.asReadonly();
  readonly count = computed(() => this.cartItems().length);
  readonly total = computed(() => this.cartItems().reduce((sum, item) => sum + item.price, 0));

  add(vehicle: Vehicle): void {
    if (!this.cartItems().some((item) => item.id === vehicle.id)) {
      this.cartItems.update((items) => [...items, vehicle]);
    }
  }

  remove(vehicleId: number): void {
    this.cartItems.update((items) => items.filter((item) => item.id !== vehicleId));
  }

  clear(): void {
    this.cartItems.set([]);
  }
}
