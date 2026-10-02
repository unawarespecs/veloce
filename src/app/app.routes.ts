import { Routes } from '@angular/router';
import { Home } from './home/home.component';
import { OrderList } from './order-list/order-list.component';
import { Cart } from './cart/cart.component';
import { ProductList } from './product-list/product-list.component';
import { SignIn } from './sign-in/sign-in.component';
import { SignUp } from './sign-up/sign-up.component';
import { Fleet } from './fleet/fleet.component';
import { ProductDetailsStandalone } from './product-details-standalone/product-details-standalone.component';

export const routes: Routes = [
    { path: '', component: Home, title: 'Veloce Car Rental' },
    { path: 'orders', component: OrderList, title: 'Your Rentals' },
    { path: 'fleet', component: Fleet, title: 'Our Fleet' },
    { path: 'cart', component: Cart, title: 'Cart' },
    { path: 'products', component: ProductList, title: 'Available Vehicles' },
    { path: 'sign-in', component: SignIn, title: 'Sign In' },
    { path: 'sign-up', component: SignUp, title: 'Sign Up' },
    { path: 'fleet/:id', component: ProductDetailsStandalone, title: 'Vehicle Details'}
];
