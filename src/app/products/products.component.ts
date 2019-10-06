
import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductService} from '../product.service';

import { ActivatedRoute } from '@angular/router';
import {Product} from '../models/product';
import {switchMap} from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products:Product[] = [];
  filteredProducts:Product[];
  cart;
  categoryKey;
  subscription:Subscription;
  
  constructor(
    route:ActivatedRoute,
    productService : ProductService,
    private shoppingCartService:ShoppingCartService) {
      
    productService.getAll().pipe(switchMap(products => {
      this.products = products
      return route.queryParamMap;
    })).subscribe(param => {
      this.categoryKey = param.get('category')
      this.filteredProducts = this.categoryKey ? this.products.filter(p => p.category === this.categoryKey):this.products
    });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe((cart) => this.cart = cart);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  }
