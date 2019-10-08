import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product:Product;
  @Input('show-actions') showActions:boolean = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService : ShoppingCartService) { }

  addToCart() {
  this.cartService.addToCart(this.product);
  }



  getQuantity() {
    if(!this.shoppingCart) return 0;
    return this.shoppingCart.getQuantity(this.product);
  }
}
