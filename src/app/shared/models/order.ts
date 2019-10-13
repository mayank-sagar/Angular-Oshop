import { ShoppingCartComponent } from '../../shopping/components/shopping-cart/shopping-cart.component';
import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
    datePlace: number
    items:any[];

    constructor(
                public userId:string,
                public shipping:any,
                shoppingCart:ShoppingCart
                ) {
        this.datePlace = new Date().getTime();
        this.items = shoppingCart.items.map((item:ShoppingCartItem) => {
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
}