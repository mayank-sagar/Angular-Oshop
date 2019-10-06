import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

items: ShoppingCartItem[] = []

constructor(public itemsMap:{[productId:string]:ShoppingCartItem}) {
for(let productId in itemsMap) {
  this.items.push(itemsMap[productId]);
}
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