import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {AdminGuard} from '../user/auth/admin.guard';
import {Page404Component} from '../error/page404/page404.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';


const routes: Routes = [
  {
    path: 'product/list',
    component: ProductListComponent
  },
  {
    path: 'product/detail/:id',
    component: ProductDetailComponent
  },
  {
    path: 'product/create',
    component: ProductCreateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    redirectTo: '/404'
  },
  {
    path: '404',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
