import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CartProduct } from '../models/CartProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  myStorage = window.localStorage;

  constructor(private http: HttpClient) { }

  
  addToCart(product: CartProduct[]): void{
    this.myStorage.setItem('cart', JSON.stringify(product));
  }
  getCartProduct(): CartProduct[] | []{
    const getProduct = this.myStorage.getItem('cart')
    return getProduct? JSON.parse(getProduct): [];
  }
  clearCart(): void{
    this.myStorage.clear();
  }
  
}
