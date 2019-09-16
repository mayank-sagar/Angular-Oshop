import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import {Router, ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {}
  id
  constructor(
      private route:ActivatedRoute,
      private router:Router,
      private categoryService: CategoryService,
      private productService:ProductService
    ) 
  { 
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p)
  }

  ngOnInit() {
  }
  save(product,isValid) {
    if(isValid) {
    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products'])
    } else {
      alert("Please coorect errors on form");
    }
  }

  delete() {
    if(!confirm('Are you sure you want to delete?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
