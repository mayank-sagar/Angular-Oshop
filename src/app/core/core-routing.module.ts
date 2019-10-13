import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from '../shopping/components/products/products.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path : '' ,
    component:ProductsComponent
    },
    {
      path: 'login',
      component:LoginComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
