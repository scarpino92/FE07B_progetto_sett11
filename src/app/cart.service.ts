import { Injectable } from '@angular/core';
import { Product } from './models/products';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  subject = new Subject<number>()
  constructor() {}

  addItems(product: Product) {
    this.cart = [...this.cart,product];
    this.subject.next(this.cart.length);
  }

  getItems() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.subject.next(0);
  }
}
