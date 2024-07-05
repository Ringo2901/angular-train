import {Component, inject} from '@angular/core';
import { FiltersComponent } from '../../components/filters/filters.component';
import { ProductTileComponent } from '../../components/product-tile/product-tile.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/products.service';
import {ProductModel} from "../../models/product.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FiltersComponent, ProductTileComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: ProductModel[] = [];
  productService: ProductService = inject(ProductService);
  filters: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters = {
        priceFrom: params['priceFrom'] || '',
        priceTo: params['priceTo'] || '',
        ratingFrom: params['ratingFrom'] || '',
        ratingTo: params['ratingTo'] || '',
        inStock: params['inStock'] === 'true',
        hasReviews: params['hasReviews'] === 'true'
      };
      this.fetchProducts(this.filters);
    });
  }

  fetchProducts(filters: any): void {
    this.productService.getProducts(filters).subscribe(value => {
      this.products = value;
    });
  }
}
