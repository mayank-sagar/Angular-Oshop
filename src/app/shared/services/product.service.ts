import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {map,concat,take} from 'rxjs/operators'
import { Observable,forkJoin } from 'rxjs';
import { Product } from 'shared/models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

    create(product) {
      return this.db.list('/products').push(product);
    }

    getAll() : Observable<Product[]>{
      let snapshotProductsObs = this.db.list('/products').snapshotChanges()
      let valueProductsObs = this.db.list('/products').valueChanges()
      return forkJoin([valueProductsObs.pipe(take(1)),snapshotProductsObs.pipe(take(1))]).pipe(map((result:any[]) => {
        let products = <Product[]>result[0];
        products.map((product,index) => {
          product.key = result[1][index].key;
          return product;
        })
        return products;
      }))
    }

    get(productId) {
      return this.db.object('/products/'+productId).valueChanges();
    }

    update(productId,product) {
      return this.db.object('/products/'+productId).update(product);
    }
    delete(productId) {
      return this.db.object('/products/'+productId).remove();
    }
}
