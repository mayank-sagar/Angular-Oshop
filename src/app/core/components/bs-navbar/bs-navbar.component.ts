import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-users';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user:AppUser
  cart$;
  constructor(private auth : AuthService,private shoppingCartService:ShoppingCartService) { 
  }
  
  logout() {
    this.auth.signout();
  }

  async ngOnInit() {
    this.auth.getUser$().subscribe(user => this.user = user)
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
