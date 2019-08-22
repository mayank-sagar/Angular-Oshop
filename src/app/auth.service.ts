import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-users';
import { UserService } from './user.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$:Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth,
              private route:ActivatedRoute,
              private userService: UserService) {
    this.user$ = afAuth.authState;
  }


   signin() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
   }

   signout() {
    this.afAuth.auth.signOut();
   }  

   getUser$() : Observable<AppUser> {
    return this.user$.
    pipe(switchMap( user => {
    if(user)
      return this.userService.get(user.uid)
    else return of(null);
    }))
   }
}
