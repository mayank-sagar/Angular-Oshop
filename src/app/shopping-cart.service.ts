import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {Product} from './models/product';
import {take, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
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
  public async addToCart(product:Product) {
    this.updateItemQuantity(product,1);
  }

  public async removeFromCart(product:Product) {
    this.updateItemQuantity(product,-1);
  }

  private async updateItemQuantity(product:Product,change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId,product.key).valueChanges();
    items$.pipe(take(1)).subscribe((item:any) => {
      this.getItem(cartId,product.key).
      update({product:product,quantity:(this.falseOrItemQuantity(item) || 0) + change})
    });
  }

  private falseOrItemQuantity(item) {
    return item?item.quantity:false;
  }
   
}
