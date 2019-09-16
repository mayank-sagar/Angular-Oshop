import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {forkJoin} from 'rxjs';
import {take,map} from 'rxjs/operators';
import { Category } from './models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) {

   }

   getAll() {
     let valueChangesObs =  this.db.list('/categories',ref => ref.orderByChild('name')).valueChanges();
     let snapshotChangesObs = this.db.list('/categories',ref => ref.orderByChild('name')).snapshotChanges();
     return forkJoin(valueChangesObs.pipe(take(1)),snapshotChangesObs.pipe(take(1))).pipe(map((result:any[]) => {
      let catgories = <Category[]>result[0];
      catgories.map((category,index) => {
        category.key = result[1][index].key;
        return category;
      })
      return catgories;
     }));
    }
}
