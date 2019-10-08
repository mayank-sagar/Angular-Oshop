import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService : ShoppingCartService) { }

  addToCart() {
  this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
   if(!this.shoppingCart || !this.product) return 0;
   return this.shoppingCart.getQuantity(this.product);
  }
}
