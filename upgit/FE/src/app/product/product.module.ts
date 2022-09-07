import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ShareModule} from '../share/share.module';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
  declarations: [ProductListComponent, ProductCreateComponent, ProductDetailComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        ShareModule,
        CKEditorModule
    ]
})
export class ProductModule { }
