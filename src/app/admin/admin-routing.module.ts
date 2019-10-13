import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {AdminProductsComponent} from './components/admin-products/admin-products.component';
import {AuthGuard} from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from "./services/admin-auth-guard.service";

const routes: Routes = [{
  path: 'admin/orders',
  component:AdminOrdersComponent,
  canActivate:[AuthGuard,AdminAuthGuard]
},

{
  path: 'admin/product/new',
  component: ProductFormComponent,
  canActivate:[AuthGuard,AdminAuthGuard]
},
{
  path: 'admin/products/:id',
  component: ProductFormComponent,
  canActivate:[AuthGuard,AdminAuthGuard]
},
{
  path: 'admin/products',
  component:AdminProductsComponent,
  canActivate:[AuthGuard,AdminAuthGuard]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
