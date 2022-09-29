import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { CartProduct } from '../../models/CartProduct';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  //productCount:number =1;
  constructor(private productService: ProductService, private cartService: CartService ) { }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(res =>{
      this.products = res;
    })

  }
  onSubmit(cartProduct: Product, event: any): boolean{
    let newCartProduct: CartProduct[] = [];
    let message: string = '';
    let isCartOptionExist: boolean = false;
 


    const cartProducts: CartProduct[] | [] = this.cartService.getCartProduct();

    const cartIdx = cartProducts.findIndex(cart => cart.id === cartProduct.id)
    newCartProduct = cartProducts;

    if((cartIdx === -1) || (cartProducts.length === 0)){
      newCartProduct.push(Object.assign(cartProduct, {count: cartProduct.quantity}))
      message = `New Item '${cartProduct.name}' added to cart`;
    } else{
      const count: number = newCartProduct[cartIdx].count;
      isCartOptionExist = cartProduct.quantity === count

      if (isCartOptionExist){
        message = `${count} Item(s) of '${cartProduct.name}' already exist in cart.`;
      }else{
        newCartProduct[cartIdx].id = cartProduct.id;
        newCartProduct[cartIdx].count = cartProduct.quantity;
        message = `${count} Item(s) of '${cartProduct.name}' already exist in cart. Will be updated to ${cartProduct.quantity}`;
      }
      
    }
    !isCartOptionExist? this.cartService.addToCart(newCartProduct): null;

    alert(message);

    this.printLocalData(); 
    return false;
  }
  printLocalData(): void{
    console.log(this.cartService.getCartProduct())
  }


}
