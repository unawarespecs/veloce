import { Component } from '@angular/core';
import { CartItems } from '../cart-items/cart-items.component';
import { Footer } from '../footer/footer.component';

@Component({
    selector: 'app-cart',
    imports: [CartItems, Footer],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class Cart {}
