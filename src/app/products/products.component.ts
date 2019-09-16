
import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';

import { ActivatedRoute } from '@angular/router';
import {Product} from '../models/product';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products:Product[] = [];
  filteredProducts:Product[];
  
  categoryKey;

  constructor(
    route:ActivatedRoute,
    productService : ProductService) {
      
    productService.getAll().pipe(switchMap(products => {
      this.products = products
      return route.queryParamMap;
    })).subscribe(param => {
      this.categoryKey = param.get('category')
      this.filteredProducts = this.categoryKey ? this.products.filter(p => p.category === this.categoryKey):this.products
    });
  }
  
  }
