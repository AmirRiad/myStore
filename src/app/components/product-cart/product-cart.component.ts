import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/CartProduct';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  products: Product[]= [];
  cartProducts: CartProduct[] = [];
  totalamount: number = 0;

  constructor(private cartService: CartService, private route: Router) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProduct();
    this.calculateTotalAmount();
  }

 

  checkNumbers(id:number ,e: Event): void {
    const input = ( e.target as HTMLInputElement)
    const value= parseInt(input.value);
    
    if (value && Math.abs(value) > 0) {
      input.value = Math.abs(value).toString();
    } else {
      input.value = "1";
    }

    const cartIdx = this.cartProducts.findIndex(cart => cart.id === id);
    this.cartProducts[cartIdx].count = value;
    this.cartProducts.length > 0 ? this.cartService.addToCart(this.cartProducts): null;
    this.calculateTotalAmount()
  }

  removeCart(id: number): void{
    const cartIdx = this.cartProducts? this.cartProducts.findIndex(cart => cart.id === id): -1;
    if(cartIdx != -1 && this.cartProducts.length > 0){
      this.cartProducts.splice(cartIdx,1)
      this.cartService.addToCart(this.cartProducts)
      this.calculateTotalAmount()
    }
  }

  calculateTotalAmount(): void{
    this.totalamount = this.cartProducts.reduce((acc: number, val: any) =>{
      return acc + val.price * val.count;
    }, 0);
    this.totalamount = Number(this.totalamount.toFixed(2));
  }

  checkout(fullname: string): void{
    this.cartService.clearCart();
    this.route.navigateByUrl(`confirmation/${fullname}/${this.totalamount}`);
  }

}
