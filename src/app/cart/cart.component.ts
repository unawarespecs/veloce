import { Component } from '@angular/core';
import { CartItems } from '../cart-items/cart-items.component';
import { Footer } from '../footer/footer.component';
import { Header } from '../header/header.component';

@Component({
    selector: 'app-cart',
    imports: [CartItems, Footer, Header],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class Cart {}
