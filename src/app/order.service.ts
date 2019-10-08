import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db:AngularFireDatabase) { }

  storeOrder(order) {
    return this.db.list('/orders').push(order);
  }
}
