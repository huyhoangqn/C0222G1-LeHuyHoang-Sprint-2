import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
    this.activatedRoute.paramMap.subscribe(value => {
      this.findProductById(value.get('id'));
    });
  }

  ngOnInit(): void {
  }

  findProductById(id: string) {
    this.productService.findProductById(id).subscribe(value => {
      this.product = value;
    });
  }

}
