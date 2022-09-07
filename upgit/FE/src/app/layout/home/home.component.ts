import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[];
  products: Product[];

  constructor(private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getNewProducts();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(value => {
      this.categories = value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.categories.length; i++) {
        this.categories[i].totalProduct = this.categories[i].productList.length;
      }
    });
  }

  getNewProducts() {
    this.productService.getNewProducts().subscribe(value => {
      this.products = value;
    });
  }
}
