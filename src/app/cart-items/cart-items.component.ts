import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../service/cart.service';
import { CreateOrder } from '../create-order/create-order.component';

@Component({
  selector: 'app-cart-items',
  imports: [CreateOrder, DecimalPipe],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css',
})
export class CartItems {
  readonly cart = inject(CartService);
  readonly showOrderForm = false;

  remove(vehicleId: number): void { this.cart.remove(vehicleId); }
  clear(): void { this.cart.clear(); }
}
