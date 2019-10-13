import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummeryComponent } from './components/shopping-cart-summery/shopping-cart-summery.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { FormsModule } from '@angular/forms';
import {ShoppingRoutingModule} from './shopping-routing.module';
import { SharedModule } from 'shared/shared.module';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
@NgModule({
  imports: [
    SharedModule,
    ShoppingRoutingModule,
  ],
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    ShoppingCartSummeryComponent,
    ProductFilterComponent,
  ],
})
export class ShoppingModule { }
