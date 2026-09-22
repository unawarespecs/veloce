import { Routes } from '@angular/router';
import { Home } from './home/home.component';
import { OrderItems } from './order-items/order-items.component';
import { Cart } from './cart/cart.component';
import { ProductList } from './product-list/product-list.component';
import { SignIn } from './sign-in/sign-in.component';
import { SignUp } from './sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: Home, title: 'Veloce Car Rental' },
  { path: 'orders', component: OrderItems, title: 'Orders' },
  { path: 'cart', component: Cart, title: 'Cart' },
  { path: 'products', component: ProductList, title: 'Available Vehicles' },
  { path: 'sign-in', component: SignIn, title: 'Sign In' },
  { path: 'sign-up', component: SignUp, title: 'Sign Up' },
];
