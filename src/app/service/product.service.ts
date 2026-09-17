import { Injectable } from '@angular/core';
import { Product } from '../model/product';

export { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsList: Product[] = [];

  constructor() { }

  getProducts(): Product[] {
    return this.productsList;
  }
}
