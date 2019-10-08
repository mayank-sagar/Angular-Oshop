import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {


items: ShoppingCartItem[] = []

constructor(private itemsMap:{[productId:string]:ShoppingCartItem}) {
  this.itemsMap = this.itemsMap || {}; 
  for(let productId in itemsMap) {
  let p = itemsMap[productId];
  this.items.push(new ShoppingCartItem({...p}));
}
}


getQuantity(product : Product) {
  console.log(product)
  let item = this.itemsMap[product.key];
  return item ? item.quantity : 0;
}

get totalPrice() {
  let sum:number = 0;
  for(let index in this.items) sum += this.items[index].totalPrice;
  return sum;
}

get productIds() {
  return Object.keys(this.itemsMap);
}
get totalItemsCount() {
    let shoppingCartItemCount = 0;
    for(let productId in this.itemsMap) {
      shoppingCartItemCount += this.itemsMap[productId].quantity
    }
    return shoppingCartItemCount;
}
}