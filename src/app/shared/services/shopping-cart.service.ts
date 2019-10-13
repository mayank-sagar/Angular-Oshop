import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {Product} from 'shared/models/product';
import {take, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }


  public async addToCart(product:Product) {
    this.updateItem(product,1);
  }

  public async removeFromCart(product:Product) {
    this.updateItem(product,-1);
  }
  
  public async getCart():Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return <Observable<ShoppingCart>>(this.db.object('/shopping-cart/'+cartId).valueChanges()).pipe(
      map((x:any) => 
      { 
        console.log(x);
        return new ShoppingCart(x.items);
      }));
  } 

  public async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/'+cartId+'/items').remove();
  }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  

  private async getOrCreateCartId():Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId)  return cartId;

    let result = await  this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

  private getItem(cartId,productKey) {
    return this.db.object('/shopping-cart/'+cartId+'/items/'+productKey);
  }
 

  private async updateItem(product:Product,change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId,product.key).valueChanges();
    items$.pipe(take(1)).subscribe((item:any) => {
      let quantity = (this.falseOrItemQuantity(item) || 0) + change;
      if(quantity == 0) {
        this.getItem(cartId,product.key).remove()
      } else {
        this.getItem(cartId,product.key).
        update({
          title:product.title,
          imageUrl:product.imageUrl,
          price:product.price,
          key:product.key,
          quantity:quantity})
      }
    });
  }

  private falseOrItemQuantity(item) {
    return item?item.quantity:false;
  }
   
}
