import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';
import { CartProduct } from '../../models/CartProduct';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {

  id: number | null = null;
  products: Product[]= [];
  product: Product | null = null;
  intialproductCount:number =1;
  //productCount:number =1;

  constructor(private route: ActivatedRoute, private productService: ProductService,private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('productId'));
    })
    this.productService.getProduct().subscribe(res =>{
      this.products = res;
      this.product = this.getProductById(this.id)
      console.log(this.product)
    })
  }
  getProductById(id: number | null): Product{
    var productData= this.products.filter(product => product.id === id)[0];
    productData.quantity=1;
    return productData;
  }
  onSubmit(cartProduct: Product): boolean{
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
      isCartOptionExist = cartProduct.quantity=== count

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
