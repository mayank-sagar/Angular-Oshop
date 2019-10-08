
import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductService} from '../product.service';

import { ActivatedRoute } from '@angular/router';
import {Product} from '../models/product';
import {switchMap} from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscribable, Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[] = [];
  filteredProducts:Product[];
  cart$:Observable<ShoppingCart>;
  categoryKey;
  
  constructor(
    private route:ActivatedRoute,
    private productService : ProductService,
    private shoppingCartService:ShoppingCartService) {
      
    
  }

  async ngOnInit() {
  this.cart$ = (await this.shoppingCartService.getCart());
  this.populateProducts();
  } 

  private populateProducts() {
    this.productService.getAll().pipe(switchMap(products => {
        this.products = products
        return this.route.queryParamMap;
      })).subscribe(param => {
        this.categoryKey = param.get('category')
        this.applyFilter();
      });  
  }

  private applyFilter() {
    this.filteredProducts = this.categoryKey ? 
    this.products.filter(p => p.category === this.categoryKey):
    this.products
  }

  }
