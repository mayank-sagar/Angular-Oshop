import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductService} from '../../product.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit ,OnDestroy{
  public products:any[] = [];
  public subscription:Subscription;

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll().subscribe(products => this.products = products);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(value) {
  }
}
