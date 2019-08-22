import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-users';
import { Observable , of} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFireDatabase) { }

  save(user:firebase.User) {
    this.db.object('/users/'+user.uid).update({
      name:user.displayName,
      email:user.email
    })
  }

  get(uid:string):Observable<AppUser>{
    return this.db.object('/users/'+uid).snapshotChanges().pipe(map(
      obj => {
        return <AppUser>obj.payload.toJSON();
      }
    ));
  }
}
