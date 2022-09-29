import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDataComponent } from './components/product-data/product-data.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { OrderCheckoutComponent } from './components/order-checkout/order-checkout.component';

const routes: Routes = [
  {path: 'productList', component: ProductListComponent},
  {path: 'product-data/:productId', component: ProductDataComponent},
  {path: 'cart', component: ProductCartComponent},
  {path: 'confirmation/:fullName/:totalPrice', component: OrderCheckoutComponent},
  {path: '**', redirectTo: 'productList'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
