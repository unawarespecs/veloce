import { Routes } from '@angular/router';
import { Home } from './home/home.component';
import { OrderItems } from './order-items/order-items.component';
import { Cart } from './cart/cart.component';
import { ProductList } from './product-list/product-list.component';
import { ProductDetails } from './product-details/product-details.component';
import { SignIn } from './sign-in/sign-in.component';

export const routes: Routes = [
  { path: '', component: Home, title: 'Veloce Car Rental' },
  { path: 'orders', component: OrderItems, title: 'Orders' },
  { path: 'cart', component: Cart, title: 'Cart' },
  { path: 'products', component: ProductList, title: 'Available Vehicles' },
  { path: 'product-detail', component: ProductDetails, title: 'Vehicle Details' },
  { path: 'sign-in', component: SignIn, title: 'Sign In' },
];
