import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductService} from '../../product.service';
import { Subscription } from 'rxjs';
import {Product} from '../../models/product';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit ,OnDestroy{
  public products:Product[] = [];
  public subscription:Subscription;
  public filteredProducts:any[];

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll().subscribe(products => this.filteredProducts = this.products = products);
   
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(value) {
    this.filteredProducts = value ? this.products.filter(product => product.title.toLowerCase().includes(value.toLowerCase()))
        :this.products;
  }
}
