import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent  implements OnInit,OnDestroy {
  
    shipping = {}; 
    cart:ShoppingCart;  
    cartSubscription:Subscription;
    authSubsciption:Subscription;
    userId:string

  constructor(
    private shoppingCartService:ShoppingCartService,
    private orderService:OrderService,
    private authService:AuthService,) { }

  
  async ngOnInit() {
  let cart$ = await this.shoppingCartService.getCart();  
  this.cartSubscription = cart$.subscribe((cart:ShoppingCart) => this.cart = cart);  
  this.authSubsciption = this.authService.user$.subscribe(user => this.userId = user.uid);
}

    placeOrder() {
    let order = {
      userId:this.userId,
      datePlaced: new Date().getTime(),
      shipping:this.shipping,
      items:this.cart.items.map(item => {
        return {
          product: {
            title:item.title,
            imageUrl:item.imageUrl,
            price:item.price
          },
          quantity:item.quantity,
          totalPrice:item.totalPrice
        }
      })
    }
    this.orderService.storeOrder(order);
  } 

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.authSubsciption.unsubscribe();
  }
}
