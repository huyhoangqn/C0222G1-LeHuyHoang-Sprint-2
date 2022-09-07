import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/Product';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {AuthService} from '../../user/service/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  public role: string;
  public username = '';
  public loginStatus: any;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private authService: AuthService,
              private toastrService: ToastrService) {
    this.authService.checkLogin().subscribe(value => {
      this.loginStatus = value;
      this.role = this.readLocalStorage('role');
      this.username = this.readLocalStorage('username');
    }, error => {
      localStorage.clear();
    });
  }

  ngOnInit(): void {
    this.getAllProductPage(0);
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(value => {
      this.categories = value;
    });
  }

  getAllProductPage(pageNumber: number) {
    this.productService.getAllPageProducts(pageNumber).subscribe(value => {
      // @ts-ignore
      if (value.totalElements >= 0) {
        // @ts-ignore
        this.products = value.content;
      }
    });
  }

  readLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

}
